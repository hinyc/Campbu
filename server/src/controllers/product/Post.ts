import { Request, Response } from 'express';
import { posts } from '../../entity/posts';
import { getRepository } from 'typeorm';

export default {
  get: async (req: Request, res: Response) => {
    const id: string = req.params.postId;
    const postRepository = getRepository(posts);
    const post = await postRepository.findOne({ id: Number(id) });
    const test = await postRepository
      .createQueryBuilder()
      .loadRelationCountAndMap('posts.reservationCount', 'posts.reservation')
      .where('posts.id = :id', { id: Number(id) })
      .getOne();
    console.log(test);
    res.status(200).json({ posts: post });
  },
  delete: async (req: Request, res: Response) => {
    const id: string = req.params.postId;
    const postRepository = getRepository(posts);
    await postRepository.delete({ id: Number(id) });
    res.status(200).json({ message: 'Product Post Successfully Deleted' });
  },
};
