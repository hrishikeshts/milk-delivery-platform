const socket = require("socket.io");

const createConnection = (server) => {
    const io = socket(server, { cors: { origin: "*" } });
    io.on("connection", (socket) => {
        console.log("Socket ID: " + socket.id);

        socket.on("order", (message) => {
            console.log(message);
            socket.broadcast.emit("order", message);
        });
        socket.on("delivery", (message) => {
            console.log(message);
            socket.broadcast.emit("delivery", message);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected...");
        });
    });
    module.exports = { io };
};

module.exports = { createConnection };
