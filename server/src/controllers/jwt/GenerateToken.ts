// import * as jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken');
import * as dotenv from 'dotenv';

dotenv.config();

export async function generateToken(email: string): Promise<string> {
  return jwt.sign(
    {
      email: email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '2d' },
  );
}
