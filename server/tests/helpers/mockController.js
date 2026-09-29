// A stand-in for a controller module. Any name destructured from it resolves to
// a handler that answers 200 { handled: true }, so a test can tell a request
// reached the handler.
module.exports = () =>
  new Proxy(
    {},
    {
      get: (_target, name) => {
        if (name === "__esModule" || name === "then") return undefined;
        return (req, res) => res.status(200).json({ handled: true, by: String(name) });
      },
    }
  );
