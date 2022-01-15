import express from 'express';
const router = express.Router();
import UserRouter from './User';
import UserinfoRouter from './Userinfo';
import PostRouter from './Post';
import ProductRouter from './Product';
import ReservationRouter from './Reservation';
import Socket from '../controllers/chats/Socket';
import Chat from './Chat';
import newurl from '../controllers/aws/NewUrl';

router.use('/user', UserRouter);
router.use('/userinfo', UserinfoRouter);
router.use('/post', PostRouter);
router.use('/product', ProductRouter);
router.use('/reservation', ReservationRouter);
router.use('/socket.io', Socket);
router.use('/chatRoom', Chat);
router.use('/newurl', newurl);

export = router;
