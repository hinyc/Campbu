import express from 'express';
const router = express.Router();
import UserRouter from './User';
import UserinfoRouter from './Userinfo';
import PostRouter from './Post';
import ProductRouter from './Product';
import ReservationRouter from './Reservation';

router.use('/user', UserRouter);
// router.use('/userinfo', UserinfoRouter);
// router.use('/post', PostRouter);
// router.use('/product', ProductRouter);
// router.use('/reservation', ReservationRouter);

export = router;
