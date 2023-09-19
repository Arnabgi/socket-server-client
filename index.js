// const app = require('express');
// const httpServer = require('http').createServer(app);
// const io = require('socket.io')(httpServer, {
//   cors: {origin : '*'}
// });

// const port = 3000;

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('join', (room) => {
//     console.log("room....",room);
//     socket.join(room);
//   });

//   socket.on('message', (data) => {
//     console.log("data.....",data);
//     io.to(data.room).emit('new-message', data.message);
//   });

//   // socket.on('message', (message) => {
//   //   console.log(message);
//   //   io.emit('message', `${socket.id.substr(0, 2)}: ${message}`);
//   // });

//   socket.on('disconnect', () => {
//     console.log('a user disconnected!');
//   });
// });

// httpServer.listen(port, () => console.log(`listening on port ${port}`));



const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: { origin: '*' },
});

const port = 3000;

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join', (room) => {
    console.log('Joining room:', room);
    socket.join(room);
  });

  socket.on('message', (data) => {
    console.log('Received message:', data.message);
    // io.to(data.room).emit('message', { user: socket.id.substr(0, 2), message: data.message });
    io.emit('message', { user: socket.id.substr(0, 2), message: data.message });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
