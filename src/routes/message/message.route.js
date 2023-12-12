const express = require("express");
const router = express.Router();

const { sendMessage, getMessageByConversationId, seenMessageById } = require("../../controllers/index.controller")

// ROUTES * /api/message/
router.post("/get", getMessageByConversationId);
router.post("/", sendMessage);
router.patch("/seen", seenMessageById);

module.exports = router;
