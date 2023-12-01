const mongoose = require("mongoose");
const conversationSchema = require("./conversation.schema");

const conversation = mongoose.model("conversation", conversationSchema);

module.exports = conversation;
