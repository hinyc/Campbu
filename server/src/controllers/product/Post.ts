import { Request, Response } from 'express';
import { posts } from '../../entity/posts';
import { users } from '../../entity/users';
import { users_reviews } from '../../entity/users_reviews';
import { getRepository } from 'typeorm';

export default {
  get: async (req: Request, res: Response) => {
    const id: number = Number(req.params.postId);
    const postRepository = getRepository(posts);
    const reviewRepository = getRepository(users_reviews);
    const userRepository = getRepository(users);

    const products = await getRepository(posts)
      .createQueryBuilder('post')
      .loadRelationCountAndMap('post.likes_count', 'post.likes')
      .where('post.id = :id', { id: id })
      .getOne();

    const user = userRepository.findOne({});
    res.status(200).json({ posts: products });
  },
  delete: async (req: Request, res: Response) => {
    const id: string = req.params.postId;
    const postRepository = getRepository(posts);
    await postRepository.delete({ id: Number(id) });
    res.status(200).json({ message: 'Product Post Successfully Deleted' });
  },
};
