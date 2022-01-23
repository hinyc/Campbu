const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

export async function authorizeToken(req: Request, res: Response) {
  const JWT = req.headers.authorization?.split(' ')[1];

  const data = jwt.verify(
    JWT,
    process.env.JWT_SECRET,
    (err: any, decoded: object) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid Accesstoken' });
      } else {
        return decoded;
      }
    },
  );
  return data;
}
