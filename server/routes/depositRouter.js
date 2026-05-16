// server/routes/depositRouter.js
const express = require("express");
const router = express.Router();

const depositController = require("../controllers/depositController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", depositController.joinDeposit);

module.exports = router;
