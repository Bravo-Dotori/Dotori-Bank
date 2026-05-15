const express = require("express");
const router = express.Router();
const transferController = require("../controllers/transferController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware,transferController.transfer); // 이체

module.exports = router;