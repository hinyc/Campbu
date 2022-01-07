import { atom } from 'recoil';

export const isLogin = atom({
  key: 'isLogin',
  default: false,
});

export const posts = atom({
  key: 'posts',
  default: [],
});
