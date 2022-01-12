import { Request, Response } from 'express';
import { createQueryBuilder, getRepository } from 'typeorm';
import { users } from '../../entity/users';
import { posts } from '../../entity/posts';
import { reservation } from '../../entity/reservation';
import { authorizeToken } from '../jwt/AuthorizeToken';

export default {
  borrow: async (req: Request, res: Response) => {
    const decoded = await authorizeToken(req, res);
    const usersRepository = getRepository(users);

    const userInfo = await usersRepository.findOne({
      email: decoded.email,
    });

    if (!userInfo) {
      return res.status(401).json({ message: 'Unauthorized User' });
    } else {
      const reservationInfo = await createQueryBuilder('reservation')
        .leftJoinAndSelect(
          posts,
          'posts',
          'reservation.users_id = posts.users_id',
        )
        .getMany();

      return res.status(200).json({ reservation: reservationInfo });
    }
  },
  lend: async (req: Request, res: Response) => {
    const decoded = await authorizeToken(req, res);
    const usersRepository = getRepository(users);

    const userInfo = await usersRepository.findOne({
      email: decoded.email,
    });

    if (!userInfo) {
      return res.status(401).json({ message: 'Unauthorized User' });
    } else {
      const postsInfo = await createQueryBuilder('posts')
        .leftJoinAndSelect(
          reservation,
          'reservation',
          'reservation.posts_id = posts.id',
        )
        .getRawMany();

      return res.status(200).json({ posts: postsInfo });
    }
  },
};
