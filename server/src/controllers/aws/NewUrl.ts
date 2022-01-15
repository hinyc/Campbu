import { Request, Response } from 'express';
import { generateUploadURL } from './s3Url';

export = async (req: Request, res: Response) => {
  const url = await generateUploadURL();
  res.json({ url });
};
