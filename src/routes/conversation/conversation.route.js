const express = require("express");
const router = express.Router();

const { getConversation, accessConversation } = require("../../controllers/index.controller")

// ROUTES * /api/user/
router.get("/", getConversation);
router.post("/", accessConversation);

module.exports = router;
