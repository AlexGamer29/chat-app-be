const mongoose = require("mongoose");
const userSchema = require("./users.schema");

const user = mongoose.model("users", userSchema);

module.exports = user;
