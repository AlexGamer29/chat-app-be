const express = require("express");
const router = express.Router();

const { signUp, logIn } = require("../../controllers/index.controller")

// ROUTES * /api/auth/
router.post("/signup", signUp);
router.post("/login", logIn);

module.exports = router;
