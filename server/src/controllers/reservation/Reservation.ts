import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { reservation } from '../../entity/reservation';
import { posts } from '../../entity/posts';

export default async (req: Request, res: Response) => {
  interface reservationType {
    posts_id: number;
    reservation_dates: string[];
  }
  const userId: number = 1;
  const { posts_id, reservation_dates }: reservationType = req.body;

  const postRepository = getRepository(posts);
  const post = await postRepository.findOne({ id: posts_id });

  const reservationRepository = getRepository(reservation);
  await reservationRepository.insert({
    reservation_dates,
    reservation_status: 1,
    posts_id: post,
  });
  res.status(201).json({ message: 'Reservation Successfully Created' });
};
