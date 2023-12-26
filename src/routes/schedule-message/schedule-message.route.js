const express = require("express");
const router = express.Router();

const { saveScheduleMessage } = require("../../controllers/index.controller")

// ROUTES * /api/schedule-message/
router.post("/", saveScheduleMessage);

module.exports = router;
