const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const mongoose = require("./config/db");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/index.route");
const app = express();

// * Database connection
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("db connected!");
});

// * Cors
app.use(cors());

// Middleware to parse cookies
app.use(cookieParser());
// * Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));

// * Api routes
app.use("/api", routes);

app.get("/", (req, res) => {
    console.log("hello");
    res.send("hello");
});

app.use("*", (req, res) => {
    res.send("Route not found");
});

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

module.exports = app;