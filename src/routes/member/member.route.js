const express = require("express");
const router = express.Router();

const { addMember } = require("../../controllers/index.controller")

// ROUTES * /api/user/
router.post("/add-member", addMember);

module.exports = router;
