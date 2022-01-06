import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { posts } from '../../entity/posts';
import axios from 'axios';

export default {
  get: async (req: Request, res: Response) => {
    const id: string = req.params.postId;
    const postRepository = getRepository(posts);
    const post = await postRepository.findOne({ id: Number(id) });
    res.status(200).json({ posts: post });
  },
  patch: async (req: Request, res: Response) => {
    interface postType {
      category: string;
      deposit: number;
      rental_fee: number;
      unavailable_dates: string[];
      title: string;
      content: string;
      address: string;
      img_urls: string[];
    }
    const id: string = req.params.postId;
    const {
      category,
      deposit,
      rental_fee,
      unavailable_dates,
      title,
      content,
      address,
      img_urls,
    }: postType = req.body;
    const postRepository = getRepository(posts);
    if (category) {
      await postRepository.update(Number(id), { category });
    }
    if (deposit) {
      await postRepository.update(Number(id), { deposit });
    }
    if (rental_fee) {
      await postRepository.update(Number(id), { rental_fee });
    }
    if (unavailable_dates) {
      await postRepository.update(Number(id), { unavailable_dates });
    }
    if (title) {
      await postRepository.update(Number(id), { title });
    }
    if (content) {
      await postRepository.update(Number(id), { content });
    }
    if (img_urls) {
      await postRepository.update(Number(id), { img_urls });
    }
    if (address) {
      const coordinates = await axios
        .get('https://dapi.kakao.com/v2/local/search/address.json', {
          headers: {
            Authorization: `KakaoAK ${process.env.KAKAOREST_API}`,
          },
          params: {
            query: address,
          },
        })
        .then((res) => {
          return res.data.documents[0];
        });
      await postRepository.update(Number(id), {
        address,
        longitude: coordinates.x,
        latitude: coordinates.y,
      });
    }
    const post = await postRepository.findOne({ id: Number(id) });
    res.status(200).json({ posts: post });
  },
};
