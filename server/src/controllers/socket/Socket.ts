import { Server } from 'socket.io';
import { server } from '../../app';

export default async () => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    const name = socket.handshake.query.chatRoomName;
    if (name !== undefined) {
      socket.join(name);
    }
    socket.on('send-message', (info) => {
      const nickName: string = info.chatRoomName;
      const text: string = info.chatMessage;
      console.log(socket.rooms);
      console.log(text);
      socket.broadcast.to(nickName).emit('receive-message', { text });
    });
  });
};
