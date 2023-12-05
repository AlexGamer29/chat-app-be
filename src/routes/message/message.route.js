const express = require("express");
const router = express.Router();

const { sendMessage } = require("../../controllers/index.controller")

// ROUTES * /api/message/
router.post("/", sendMessage);

module.exports = router;
