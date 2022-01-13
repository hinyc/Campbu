import { Request, Response } from 'express';
import { createQueryBuilder, getRepository } from 'typeorm';
import { users } from '../../entity/users';
import { posts } from '../../entity/posts';
import { likes } from '../../entity/likes';
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
        .leftJoinAndSelect('reservation.posts_id', 'posts')
        .where('reservation.users_id = :users_id', { users_id: userInfo.id })
        .getMany();

      return res.status(200).json({ borrow: reservationInfo });
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
      const postsInfo = await createQueryBuilder('reservation')
        .leftJoinAndSelect('reservation.posts_id', 'posts')
        .where('posts.users_id = :users_id', { users_id: userInfo.id })
        .getMany();

      return res.status(200).json({ lend: postsInfo });
    }
  },
  like: async (req: Request, res: Response) => {
    const decoded = await authorizeToken(req, res);
    const usersRepository = getRepository(users);
    const likesRepository = getRepository(likes);
    const postsRepository = getRepository(posts);

    const userInfo = await usersRepository.findOne({
      email: decoded.email,
    });

    if (!userInfo) {
      return res.status(401).json({ message: 'Unauthorized User' });
    } else {
      const likesInfo = await likesRepository
        .createQueryBuilder('likes')
        .select('posts_id')
        .where('likes.users_id = :users_id', { users_id: userInfo.id })
        .getRawMany();

      const postInfo = await Promise.all(
        likesInfo.map(async (el) => {
          return await postsRepository
            .createQueryBuilder('post')
            .loadRelationCountAndMap('post.likes_count', 'post.likes')
            .where('post.id = :id', { id: el.posts_id })
            .getMany();
        }),
      );
      return res.status(200).json({ posts: postInfo.flat() });
    }
  },
  post: async (req: Request, res: Response) => {
    const decoded = await authorizeToken(req, res);
    const usersRepository = getRepository(users);
    const postsRepository = getRepository(posts);

    const userInfo = await usersRepository.findOne({
      email: decoded.email,
    });

    if (!userInfo) {
      return res.status(401).json({ message: 'Unauthorized User' });
    } else {
      const postInfo = await postsRepository.find({ users_id: userInfo });

      return res.status(200).json({ posts: postInfo });
    }
  },
};
