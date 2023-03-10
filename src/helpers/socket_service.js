const { Server } = require("socket.io")
require("dotenv").config()

const socketService = server => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_API_URL,
      credentials: true,
    },
  });

  const onlineUsers = {};
  io.on("connection", socket => {

    socket.on("sign_in", data => {
      if (!onlineUsers[socket.id]) onlineUsers[socket.id] = { ...data, socketId: socket.id };
      io.emit("online_users", onlineUsers);
    });

    socket.on("send_message", data => {
      const sendUserSocket = onlineUsers[data.receiver];
      if (sendUserSocket && sendUserSocket.socketId) {
        socket.to(sendUserSocket.socketId).emit("msg_receive", data);
      }
    });

    socket.on("join_group", data => {
      socket.join(data.groupId)
    })

    socket.on("send_message_group", data => {
      socket.to(data.groupId).emit("msg_group_receive", data);
    })

    socket.on("invite", data => {
      const _onlineUsers = Object.values(onlineUsers)
      const user = _onlineUsers.find(user => user._id === data.userId);
      if (user) {
        socket.to(user.socketId).emit("invited", data)
      }
    })

    socket.on("remove", data => {
      const _onlineUsers = Object.values(onlineUsers);
      const user = _onlineUsers.find(user => user._id === data.userId);
      if (user) {
        socket.to(user.socketId).emit("removed", data);
      }
      socket.to(data.groupId).emit("user-removed", data);
    });

    socket.on("disconnect", () => {
      delete onlineUsers[socket.id];
      io.emit("online_users", onlineUsers);
    });
  });
};

module.exports = socketService;
