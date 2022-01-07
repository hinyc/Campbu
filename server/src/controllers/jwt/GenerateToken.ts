// import * as jwt from 'jsonwebtoken';
const JWT = require('jsonwebtoken');
import * as dotenv from 'dotenv';

dotenv.config();

export async function generateToken(email: string) {
  return JWT.sign(
    {
      email: email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '2d' },
  );
}
