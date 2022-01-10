import { Request, Response } from 'express';
import { createQueryBuilder, getRepository } from 'typeorm';
import { users } from '../../entity/users';
import { users_reviews } from '../../entity/users_reviews';
import { authorizeToken } from '../jwt/AuthorizeToken';

export default {
  get: async (req: Request, res: Response) => {
    const decoded = await authorizeToken(req, res);
    const usersRepository = getRepository(users);

    const userInfo = await usersRepository.findOne({
      email: decoded.email,
    });

    if (!userInfo) {
      return res.status(401).json({ message: 'Unauthorized User' });
    } else {
      const userReviews = await createQueryBuilder('users_reviews')
        .select(['reviews_id', 'count'])
        .where('users_reviews.users_id = :users_id', { users_id: userInfo.id })
        .getRawMany();

      return res.status(200).json({ users: userInfo, reviews: userReviews });
    }
  },
  patch: async (req: Request, res: Response) => {
    interface User {
      nickname: string;
      password: string;
      users_img: string;
    }
    const { nickname, password, users_img }: User = req.body;
    const decoded = await authorizeToken(req, res);
    const usersRepository = getRepository(users);

    const userInfo = await usersRepository.findOne({
      email: decoded.email,
    });

    if (!userInfo) {
      return res.status(401).json({ message: 'Unauthorized User' });
    } else {
      console.log('nickname', nickname);
      console.log('password', password);
      console.log('users_img', users_img);
      if (nickname) {
        await usersRepository.update(userInfo.id, { nickname: nickname });
      }
      const userReviews = await createQueryBuilder('users_reviews')
        .select(['reviews_id', 'count'])
        .where('users_reviews.users_id = :users_id', { users_id: userInfo.id })
        .getRawMany();

      const userInfoUpdated = await usersRepository.findOne({
        email: decoded.email,
      });

      return res
        .status(200)
        .json({ users: userInfoUpdated, reviews: userReviews });
    }
  },
};
