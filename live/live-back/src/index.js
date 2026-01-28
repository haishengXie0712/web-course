const socket = require("socket.io");
const http = require("http");
const server = http.createServer();

const io = socket(server, {
  cors: {
    origin: "*", // 配置跨域
  },
});
let count = 0;
io.on("connection", (sock) => {
  console.log("连接成功...");
  // 向客户端发送连接成功的消息
  sock.emit("connectionSuccess");

  sock.on("joinRoom", (roomId) => {
    sock.join(roomId);
    count += 1;
  });

  sock.on("disconnect", (reason) => {
    count -= 1;
  });

  sock.on("callRemote", (roomId) => {
    io.to(roomId).emit("callRemote");
  });

  sock.on("acceptCall", (roomId) => {
    io.to(roomId).emit("acceptCall");
  });

  sock.on("sendOffer", ({ offer, roomId }) => {
    io.to(roomId).emit("sendOffer", offer);
  });

  sock.on("sendAnswer", ({ answer, roomId }) => {
    io.to(roomId).emit("sendAnswer", answer);
  });

  sock.on("sendCandidate", ({ candidate, roomId }) => {
    io.to(roomId).emit("sendCandidate", candidate);
  });
});

server.listen(3000, () => {
  console.log("服务器启动成功");
});

