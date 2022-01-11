import { Request, Response } from 'express';
import { createQueryBuilder, getRepository } from 'typeorm';
import { users } from '../../entity/users';
import { reservation } from '../../entity/reservation';
import { authorizeToken } from '../jwt/AuthorizeToken';
import { posts } from '../../entity/posts';

export default {
  borrow: async (req: Request, res: Response) => {
    const decoded = await authorizeToken(req, res);
    const usersRepository = getRepository(users);
    const reserveRepository = getRepository(reservation);
    const postRepository = getRepository(posts);

    const userInfo = await usersRepository.findOne({
      email: decoded.email,
    });

    if (!userInfo) {
      return res.status(401).json({ message: 'Unauthorized User' });
    } else {
      const reservationInfo = await createQueryBuilder('reservation')
        .leftJoinAndSelect(posts, 'posts', 'reservation.posts_id = posts.id')
        .getMany();

      res.status(200).json({ reservation: reservationInfo });
    }
  },
};
