const express = require('express');
const socket = require("socket.io");
const config = require('./config');

const app = express()
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()
require('./startup/validation')()

const server = app.listen(config.port, () =>
	console.log(`Listening on port ${config.port}...`)
)

// Socket setup
const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const activeUsers = {};

io.on("connection", function(socket) {
  console.log("Made socket connection");
  socket.on("add_user", function(data) {
    socket.userId = data._id;
		activeUsers[data._id] = data;
    io.emit("user_added", { activeUsers, data });
    console.log("New User", { activeUsers });
  });

	socket.on('disconnect', () => {
    delete activeUsers[socket.userId];
		io.emit("user_disconnected", { activeUsers, data: socket.userId });
		console.log("Lost User", socket.userId, activeUsers);
  });

	socket.on('chat_message', function(data) {
    io.emit("chat_message", data);
	})

	socket.on('typing', function(data) {
    socket.broadcast.emit("typing", data);
	})

	socket.on('new_meet', function(data) {
		io.emit("meet_added", data);
		console.log("meet_added", data);
	})

	socket.on('meet_update', function(data) {
		io.emit("meet_updated", data);
		console.log("meet_updated", data);
	})
	socket.on('meet_delete', function(data) {
		io.emit("meet_deleted", data);
		console.log("meet_added", data);
	})
});

module.exports = { server };
