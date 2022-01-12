import axios from 'axios';
import { host } from '../../common';

export const onBorrowClick = () => {
  axios
    .get(`${host}/userinfo/product/borrow`)
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));
};

export const onLendClick = () => {
  axios
    .get(`${host}/userinfo/product/lend`)
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));
};

export const onLikeClick = () => {
  axios
    .get(`${host}/userinfo/product/like`)
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));
};

export const onResistClick = () => {
  axios
    .get(`${host}/userinfo/product/post`)
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));
};
