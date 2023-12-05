const express = require("express");
const router = express.Router();

const { sendMessage, getMessageByConversationId } = require("../../controllers/index.controller")

// ROUTES * /api/message/
router.post("/get", getMessageByConversationId);
router.post("/", sendMessage);

module.exports = router;
