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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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

const server = app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "*",
        // credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log(`*** Connected to socket`)

    socket.on('setup', (userData) => {
        socket.join(userData._id)
        console.log(`*** ID`, userData._id)
        socket.emit("connected")
    })

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (sendMessage, conversation) => {
        // if (!conversation.members || conversation.members.length === 0) console.log(`chat.users not defined`)

        conversation.members.forEach(member => {
            if (member.user[0]._id === sendMessage.from) return;

            socket.in(member.user[0]._id).emit("message received", sendMessage)
        })
    })

    socket.on("message seen", (userSeen, message, conversation) => {
        conversation.members.forEach((member) => {
            if (member.user[0]._id === userSeen._id) return;
            socket.in(member.user[0]._id).emit("seen", userSeen, message);
        });
    });
})

module.exports = app;