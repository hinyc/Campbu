import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { users } from '../../entity/users';
import { generateToken } from '../jwt/GenerateToken';

export default async (req: Request, res: Response) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  const usersRepository = getRepository(users);

  if (!email || !password) {
    return res.status(400).json({ message: 'Bad Request' });
  } else {
    const userInfo = await usersRepository.findOneOrFail({
      email: email,
      password: password,
    });

    if (userInfo) {
      const token = await generateToken(userInfo.email);

      return res
        .status(200)
        .cookie('jwt', token, { httpOnly: true })
        .json({ message: 'Login Successfully' });
    } else {
      return res.status(404).json({ message: 'User not exists' });
    }
  }
};
