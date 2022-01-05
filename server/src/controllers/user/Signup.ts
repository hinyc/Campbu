import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { users } from '../../entity/users';

export default {
  get: async (req: Request, res: Response) => {
    const email: string = req.params.email;
    const usersRepository = getRepository(users);

    const userInfo = await usersRepository.findOne({ email: email });

    if (userInfo) {
      return res.status(409).json({ message: 'Email already exists' });
    } else {
      return res.status(200).json({ message: 'Avaliable Email' });
    }
  },
  post: async (req: Request, res: Response) => {
    const email: string = req.body.email;
    const nickname: string = req.body.nickname;
    const password: string = req.body.password;
    const users_img: string = req.body.users_img;
    const usersRepository = getRepository(users);

    if (!email || !nickname || !password || !users_img) {
      return res.status(400).json({ message: 'Bad Request' });
    } else {
      const userInfo = await usersRepository.findOne({ email: email });

      if (userInfo) {
        return res.status(409).json({ message: 'Account already exists' });
      }
      await usersRepository.insert({
        email: email,
        nickname: nickname,
        password: password,
        users_img: users_img,
      });

      return res.status(201).json({ message: 'Create Successfully' });
    }
  },
};
