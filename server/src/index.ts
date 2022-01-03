import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { users } from './entity/users';

createConnection()
  .then(async (connection) => {
    const user = new users();
    user.email = 'test@test.com';
    user.nickname = 'yechan';
    user.password = '1234';
    user.users_img = 'dfsjf';
    await connection.manager.save(user);
  })
  .catch((error) => console.log(error));
