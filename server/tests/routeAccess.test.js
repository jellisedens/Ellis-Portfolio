// Route access tests: who may call which API route.
//
// No database is used. config is replaced by a fixed object (so .env is never
// read), config/db is replaced by a function that fails the test if called,
// the Admin model is replaced by a stub, and every controller is replaced by a
// handler that answers 200 { handled: true }. What is under test is the real
// app: its middleware, routers, and the real `protect` middleware.

const TEST_SECRET = "test-secret-not-the-real-one";

jest.mock("../config", () => ({
  port: 0,
  nodeEnv: "test",
  clientUrl: "http://localhost:5173",
  adminUrl: "http://localhost:5174",
  mongoUri: undefined,
  jwtSecret: "test-secret-not-the-real-one",
  jwtExpire: "1h",
}));

// app.js no longer requires config/db; this guards against it (or a route) doing so.
jest.mock("../config/db", () =>
  jest.fn(() => {
    throw new Error("connectDB must never be called in tests");
  })
);

jest.mock("../models/Admin", () => ({ findById: jest.fn() }));

// Every controller answers 200 { handled: true } (see helpers/mockController.js).
jest.mock("../controllers/authController", () => require("./helpers/mockController")());
jest.mock("../controllers/categoryController", () => require("./helpers/mockController")());
jest.mock("../controllers/educationController", () => require("./helpers/mockController")());
jest.mock("../controllers/experienceController", () => require("./helpers/mockController")());
jest.mock("../controllers/messageController", () => require("./helpers/mockController")());
jest.mock("../controllers/projectController", () => require("./helpers/mockController")());
jest.mock("../controllers/serviceController", () => require("./helpers/mockController")());
jest.mock("../controllers/siteSettingsController", () => require("./helpers/mockController")());
jest.mock("../controllers/skillController", () => require("./helpers/mockController")());

const request = require("supertest");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const protect = require("../middleware/auth");
const connectDB = require("../config/db");
const app = require("../app");

// --- The classification: every route in the API is listed here, once. ---
const ID = "64b000000000000000000001";
const RESOURCES = ["categories", "education", "experience", "projects", "skills", "services"];

const PUBLIC_ROUTES = [
  ["GET", "/api/health"],
  ["POST", "/api/auth/login"],
  ["GET", "/api/settings"],
  ["POST", "/api/messages"],
];
const PROTECTED_ROUTES = [
  ["GET", "/api/auth/me"],
  ["PUT", "/api/settings"],
  ["GET", "/api/messages"],
  ["GET", `/api/messages/${ID}`],
  ["PUT", `/api/messages/${ID}`],
  ["DELETE", `/api/messages/${ID}`],
];
for (const r of RESOURCES) {
  PUBLIC_ROUTES.push(["GET", `/api/${r}`], ["GET", `/api/${r}/${ID}`]);
  PROTECTED_ROUTES.push(
    ["POST", `/api/${r}`],
    ["PUT", `/api/${r}/${ID}`],
    ["DELETE", `/api/${r}/${ID}`]
  );
}

const send = (method, path, token) => {
  let req = request(app)[method.toLowerCase()](path);
  if (token !== undefined) req = req.set("Authorization", token);
  return method === "POST" || method === "PUT" ? req.send({}) : req;
};

const validToken = () => `Bearer ${jwt.sign({ id: "admin-1" }, TEST_SECRET, { expiresIn: "1h" })}`;

const BAD_CREDENTIALS = {
  "no Authorization header": undefined,
  "Authorization header without Bearer": "not-a-bearer-header",
  "Bearer with no token": "Bearer",
  "malformed token": "Bearer this.is.not-a-jwt",
  "token signed with the wrong secret": `Bearer ${jwt.sign({ id: "admin-1" }, "some-other-secret")}`,
  "expired token": `Bearer ${jwt.sign({ id: "admin-1" }, TEST_SECRET, { expiresIn: -60 })}`,
  "unsigned (alg none) token": `Bearer ${Buffer.from('{"alg":"none","typ":"JWT"}').toString("base64url")}.${Buffer.from('{"id":"admin-1"}').toString("base64url")}.`,
};

let errorSpy;
let logSpy;
beforeAll(() => {
  errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
});
afterAll(() => {
  errorSpy.mockRestore();
  logSpy.mockRestore();
});
beforeEach(() => {
  Admin.findById.mockReset();
  Admin.findById.mockResolvedValue({ _id: "admin-1" });
});

describe("protected routes", () => {
  describe.each(PROTECTED_ROUTES)("%s %s", (method, path) => {
    test.each(Object.entries(BAD_CREDENTIALS))("401 with %s", async (_label, header) => {
      const res = await send(method, path, header);
      expect(res.status).toBe(401);
      expect(res.body.handled).toBeUndefined();
    });

    test("401 when the token is valid but the admin no longer exists", async () => {
      Admin.findById.mockResolvedValue(null);
      const res = await send(method, path, validToken());
      expect(res.status).toBe(401);
      expect(res.body.handled).toBeUndefined();
    });

    test("a valid token reaches the handler", async () => {
      const res = await send(method, path, validToken());
      expect(res.status).toBe(200);
      expect(res.body.handled).toBe(true);
    });
  });
});

describe("public routes", () => {
  test.each(PUBLIC_ROUTES)("%s %s needs no token", async (method, path) => {
    const res = await send(method, path);
    expect(res.status).not.toBe(401);
    expect(res.status).toBe(200);
  });

  test.each(PUBLIC_ROUTES)("%s %s ignores a bad token", async (method, path) => {
    const res = await send(method, path, "Bearer this.is.not-a-jwt");
    expect(res.status).not.toBe(401);
  });
});

describe("removed debug route", () => {
  test.each(["GET", "POST", "PUT", "DELETE"])("%s /api/test is 404", async (method) => {
    expect((await send(method, "/api/test")).status).toBe(404);
    expect((await send(method, "/api/test", validToken())).status).toBe(404);
  });
});

describe("classification is complete", () => {
  // Walk the real Express router tree and list every method + path.
  const mountOf = (layer) =>
    layer.regexp.source.replace("^\\/", "/").replace("\\/?(?=\\/|$)", "").replace(/\\\//g, "/");

  const collectRoutes = () => {
    const found = [];
    const walk = (stack, prefix) => {
      for (const layer of stack) {
        if (layer.route) {
          for (const method of Object.keys(layer.route.methods)) {
            // Handlers of a route are per method (router.route("/").get(a).post(protect, b)).
            const isProtected = layer.route.stack.some(
              (l) => l.handle === protect && (!l.method || l.method === method)
            );
            const path = (prefix + (layer.route.path === "/" ? "" : layer.route.path)) || "/";
            found.push({ method: method.toUpperCase(), path, isProtected });
          }
        } else if (layer.name === "router") {
          walk(layer.handle.stack, prefix + mountOf(layer));
        }
      }
    };
    walk(app._router.stack, "");
    return found;
  };

  const normalise = (p) => p.replace(ID, ":id");
  const key = (method, path) => `${method} ${normalise(path)}`;

  test("every route in the app is classified in this file, and none is misclassified", () => {
    const declaredProtected = new Set(PROTECTED_ROUTES.map(([m, p]) => key(m, p)));
    const declaredPublic = new Set(PUBLIC_ROUTES.map(([m, p]) => key(m, p)));
    const routes = collectRoutes();
    expect(routes.length).toBeGreaterThan(0);

    const unclassified = [];
    const wrong = [];
    for (const { method, path, isProtected } of routes) {
      const k = `${method} ${path}`;
      if (!declaredProtected.has(k) && !declaredPublic.has(k)) unclassified.push(k);
      else if (isProtected !== declaredProtected.has(k)) wrong.push(k);
    }
    expect(unclassified).toEqual([]);
    expect(wrong).toEqual([]);
  });

  test("every route classified in this file exists in the app", () => {
    const actual = new Set(collectRoutes().map(({ method, path }) => `${method} ${path}`));
    const missing = [...PROTECTED_ROUTES, ...PUBLIC_ROUTES]
      .map(([m, p]) => key(m, p))
      .filter((k) => !actual.has(k));
    expect(missing).toEqual([]);
  });
});

test("the tests never connect to a database", () => {
  expect(connectDB).not.toHaveBeenCalled();
});
