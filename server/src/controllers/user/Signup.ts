import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { users } from "../../entity/users";

const signup = async (req: Request, res: Response) => {
  const user: users = new users();
  const { email, nickname, password, users_img } = req.body;

  if (!email || !nickname || !password || !users_img) {
    res.status(400).json({ message: "Bad Request" })
  }
  else {
    
  }
}

export default signup;