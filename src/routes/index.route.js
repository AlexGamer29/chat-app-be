const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middlewares/index.middleware")

const user = require("./user/user.route");
const auth = require("./auth/auth.route");
const member = require("./member/member.route")
const conversation = require("./conversation/conversation.route")

// AUTH Routes * /api/auth/*
router.use("/auth", auth);
router.use("/user", authenticateJWT, user);
router.use("/member", authenticateJWT, member);
router.use("/conversation", authenticateJWT, conversation);

module.exports = router;
