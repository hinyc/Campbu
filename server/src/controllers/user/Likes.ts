import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { likes } from '../../entity/likes';
import { authorizeToken } from '../jwt/AuthorizeToken';

export default async (req: Request, res: Response) => {
  const decoded = await authorizeToken(req, res);
  console.log(decoded);
};
