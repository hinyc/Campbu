import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { getRepository } from 'typeorm';
import { posts } from '../../entity/posts';
dotenv.config();

export = async (req: Request, res: Response) => {
  const {
    category,
    deposit,
    rental_fee,
    unavailable_dates,
    title,
    content,
    address,
    img_urls,
  } = req.body;
  if (
    category === undefined ||
    deposit === undefined ||
    rental_fee === undefined ||
    unavailable_dates === undefined ||
    title === undefined ||
    content === undefined ||
    address === undefined ||
    img_urls === undefined
  ) {
    res.status(400).json({ message: 'Bad Request' });
  } else {
    const coordinates = await axios
      .get(`https://dapi.kakao.com/v2/local/search/address.json`, {
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
    const postRepository = getRepository(posts);
    await postRepository.insert({
      category,
      deposit,
      rental_fee,
      unavailable_dates,
      title,
      content,
      longitude: coordinates.x,
      latitude: coordinates.y,
      address,
      img_urls,
    });
    res.status(200).json({ message: 'Post Successfully Created' });
  }
};
