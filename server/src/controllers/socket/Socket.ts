import { Server } from 'socket.io';
import { server } from '../../app';

export = async () => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
    },
  });

  io.on('connection', (socket) => {
    socket.emit('message', 'Welcome to ChatCord!');

    socket.broadcast.emit('message', 'A user has joined the chat');

    socket.on('disconnet', () => {
      io.emit('message', 'A user has left the chat');
    });
  });
};
