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
    socket.on('open-room', async (ids) => {
      ids.map((id: any) => {
        socket.join(id);
      });
    });
    socket.on('send-message', async (info) => {
      const id: string = info.chatRoomId;
      const message: string = info.chatMessage;
      const nickName: string = info.userNickName;
      const date = Date();

      const chatMessage = { message, sender: nickName, date };
      const chatRepository = getRepository(chats);
      const chat = await chatRepository
        .findOne({ id: Number(id) })
        .then((res: any) => {
          return JSON.parse(res.chat);
        });
      const newChat = JSON.stringify(chat.concat(chatMessage));
      chatRepository.update(Number(id), { chat: newChat });

      io.to(id).emit('receive-message', {
        message,
        sender: nickName,
        date,
        id,
      });
    });
  });
};
