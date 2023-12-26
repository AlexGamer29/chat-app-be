const mongoose = require("mongoose");
const messageSchema = require("./schedule-message.schema");

const message = mongoose.model("scheduleMessage", messageSchema);

module.exports = message;
