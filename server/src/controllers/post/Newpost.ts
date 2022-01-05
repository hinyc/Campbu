import { Request, Response } from 'express';
import axios from 'axios';
import { getRepository } from 'typeorm';
import { posts } from '../../entity/posts';

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
  console.log(address);
  const test = await axios
    .get(`https://dapi.kakao.com/v2/local/search/address.json`, {
      headers: {
        Authorization: 'KakaoAK 5e50f118d1e4bf8ddfe8f2f9f153bb70',
      },
      params: {
        query: address,
      },
    })
    .then((res) => {
      return res.data.documents[0];
    });
  console.log(test);
  res.send('newpost ok?');
};
