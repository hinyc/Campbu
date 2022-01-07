const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

export async function authorizeToken(
  req: Request,
  res: Response,
): Promise<any> {
  const JWT: string = req.cookies.jwt;
  console.log('JWT: ', JWT);

  const data = jwt.verify(
    JWT,
    process.env.JWT_SECRET,
    (err: any, decoded: object) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid Accesstoken' });
      } else {
        console.log('decoded: ', decoded);
        return decoded;
      }
    },
  );
}
