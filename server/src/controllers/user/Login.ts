import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { users } from '../../entity/users';

export default async (req: Request, res: Response) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  const usersRepository = getRepository(users);

  const userInfo = await usersRepository.findOneOrFail({
    email: email,
    password: password,
  });
  console.log(userInfo);

  if (userInfo) {
    return res.status(200).json({ data: userInfo });
  } else {
    return res.status(500).json({ message: '500' });
  }
};
