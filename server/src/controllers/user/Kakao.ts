import axios from 'axios';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { users } from '../../entity/users';
import { generateToken } from '../jwt/GenerateToken';

export default {
  token: async (req: Request, res: Response) => {
    const code = req.body.authorizationCode;
    const REST_API_KEY = 'b8665986f69d987ebb83449a6a9b06ba';
    const REDIRECT_URI = 'http://localhost:3000/oauth/kakao/callback';
    console.log(code);

    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      )
      .then((response) => res.send(response.data));
  },
};
