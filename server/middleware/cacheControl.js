const cacheControl = (seconds) => {
  return (req, res, next) => {
    if (req.method === "GET") {
      res.set("Cache-Control", `public, max-age=${seconds}`);
    }
    next();
  };
};

module.exports = cacheControl;