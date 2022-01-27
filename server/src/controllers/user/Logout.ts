import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  return res
    .clearCookie('jwt')
    .status(205)
    .json({ message: 'Logout Successfully' });
};
