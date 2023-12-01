const mongoose = require("mongoose");
const memberSchema = require("./member.schema");

const member = mongoose.model("member", memberSchema);

module.exports = member;
