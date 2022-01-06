import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const secret = <string>process.env.JWT_SECRET;

export default {
  generateToken: async (email: string): Promise<string> => {
    return jwt.sign({ email }, secret, { expiresIn: '2d' });
  },
};
