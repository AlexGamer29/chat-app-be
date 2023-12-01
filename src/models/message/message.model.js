const mongoose = require("mongoose");
const messageSchema = require("./message.schema");

const message = mongoose.model("message", messageSchema);

module.exports = message;
