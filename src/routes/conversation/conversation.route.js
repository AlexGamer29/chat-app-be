const express = require("express");
const router = express.Router();

const { getConversation, createGroupConversation, accessConversation } = require("../../controllers/index.controller")

// ROUTES * /api/user/
router.get("/", getConversation);
router.post("/", accessConversation);
router.post("/create", createGroupConversation);

module.exports = router;
