const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController");

router.get("/", testController.getTest);
router.post("/", testController.postTest);

module.exports = router;