import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { reservation } from '../../entity/reservation';
import { posts } from '../../entity/posts';
import { users } from '../../entity/users';
import { authorizeToken } from '../jwt/AuthorizeToken';

export default async (req: Request, res: Response) => {
  interface reservationType {
    posts_id: number;
    reservation_dates: string[];
  }
  const decoded = await authorizeToken(req, res);
  const userRepository = await getRepository(users);
  const user = await userRepository.findOne({ email: decoded.email });

  if (!user) {
    res.status(401).json({ message: 'Unauthorized User' });
  } else {
    const { posts_id, reservation_dates }: reservationType = req.body;

    if (posts_id === undefined || reservation_dates === undefined) {
      res.status(400).json({ message: 'Bad Request' });
    } else {
      const postRepository = getRepository(posts);
      const post = await postRepository.findOne({ id: posts_id });

      const reservationRepository = getRepository(reservation);
      await reservationRepository.insert({
        reservation_dates,
        reservation_status: 1,
        users_id: user,
        posts_id: post,
      });
      res.status(201).json({ message: 'Reservation Successfully Created' });
    }
  }
};
