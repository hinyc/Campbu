import { Request, Response } from 'express';
import { createQueryBuilder, getRepository } from 'typeorm';
import { users } from '../../entity/users';
import { users_reviews } from '../../entity/users_reviews';
import { reviews } from '../../entity/reviews';
import { authorizeToken } from '../jwt/AuthorizeToken';

export default {
  get: async (req: Request, res: Response) => {
    const decoded = await authorizeToken(req, res);
    const usersRepository = getRepository(users);
    const userReviewsRepository = getRepository(users_reviews);
    const reviewsRepository = getRepository(reviews);

    const userInfo = await usersRepository.findOne({
      email: decoded.email,
    });

    if (!userInfo) {
      return res.status(401).json({ message: 'Unauthorzied User' });
    } else {
      const userReviews = await userReviewsRepository.find({
        users_id: userInfo,
      });
      console.log(userInfo);
      console.log(userReviews);
      // const userJoinReview = await usersRepository
      //   .createQueryBuilder('users')
      //   .leftJoinAndSelect('users', 'users_reviews')
      //   .where('users.id = :userInfo.id')
      //   .getOne();
    }
  },
};
