const socket = require("socket.io");

const createConnection = (server) => {
    const io = socket(server, { cors: { origin: "*" } });
    const hour = new Date().getHours();
    io.on("connection", (socket) => {
        console.log("Socket ID: " + socket.id);

        socket.on("order", (message) => {
            console.log(message);
            socket.broadcast.emit("order", { message, hour });
        });
        socket.on("delivery", (message) => {
            console.log(message);
            socket.broadcast.emit("delivery", { message, hour });
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected...");
        });
    });
    module.exports = { io };
};

module.exports = { createConnection };
