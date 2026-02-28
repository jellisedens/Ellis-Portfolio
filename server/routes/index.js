const express = require("express");
const router = express.Router();

router.use("/health", require("./health"));
router.use("/test", require("./test"));
router.use("/categories", require("./categories"));
router.use("/skills", require("./skills"));
router.use("/projects", require("./projects"));
router.use("/education", require("./education"));
router.use("/experience", require("./experience"));
router.use("/messages", require("./messages"));

module.exports = router;