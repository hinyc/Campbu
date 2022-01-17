import { Server } from 'socket.io';
import { server } from '../../app';
import { chats } from '../../entity/chats';
import { posts } from '../../entity/posts';
import { reservation } from '../../entity/reservation';
import { getRepository } from 'typeorm';

export default async () => {
  const io = await new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  await io.on('connection', async (socket) => {
    socket.on('send-message', (info) => {
      const id: string = info.chatRoomId;
      const message: string = info.chatMessage;
      const nickName: string = info.userNickName;

      socket.join(id);
      io.to(id).emit('receive-message', { message, sender: nickName });
    });
  });
};
