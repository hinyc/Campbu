import { Request, Response } from 'express';
import { getManager, getRepository } from 'typeorm';
import axios from 'axios';
import { posts } from '../../entity/posts';
import { users } from '../../entity/users';
import { likes } from '../../entity/likes';
const jwt = require('jsonwebtoken');

export = async (req: Request, res: Response) => {
  const address = req.params.addressId;

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

  if (coordinates === undefined) {
    res.status(400).json({ message: 'Bad Request' });
  } else {
    const entityManager = getManager();
    const distance = 2;
    const nearbyProduct = await entityManager
      .query(
        `
    SELECT id, (
      6371 * acos (
      cos ( radians(${Number(coordinates.y)}) )
      * cos( radians( latitude ) )
      * cos( radians( longitude ) - radians(${Number(coordinates.x)}) )
      + sin ( radians(${Number(coordinates.y)}) )
      * sin( radians( latitude ) )
      )
    ) AS distance
    FROM posts
    HAVING distance < ${distance}
    ORDER BY distance`,
      )
      .then((res: Response) => {
        return JSON.stringify(res);
      });

    if (!nearbyProduct) {
      res.status(500).json({ message: 'Server Error' });
    } else {
      const nearbyProductId = JSON.parse(nearbyProduct).map(
        (product: object) => {
          return Object.values(product)[0];
        },
      );

      const products = await getRepository(posts)
        .createQueryBuilder('post')
        .loadRelationCountAndMap('post.likes_count', 'post.likes')
        .where('post.id IN (:...ids)', { ids: nearbyProductId })
        .getMany();

      if (req.cookies.jwt) {
        const decoded = jwt.verify(
          req.cookies.jwt,
          process.env.JWT_SECRET,
          (err: Error, decoded: object) => {
            if (err) {
              return { email: null };
            } else {
              return decoded;
            }
          },
        );

        const userRepository = await getRepository(users);
        const user = await userRepository.findOne({ email: decoded.email });

        const likesRepository = await getRepository(likes);
        const like = await likesRepository
          .createQueryBuilder()
          .where({ users_id: user })
          .addSelect('likes.posts_id')
          .getMany();

        res.status(200).json({ posts: products, likes: like });
      } else {
        res.status(200).json({ posts: products, likes: [] });
      }
    }
  }
};
