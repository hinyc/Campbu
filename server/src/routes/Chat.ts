import express from 'express';
const router = express.Router();
import ChatRoom from '../controllers/chats/ChatRoom';

router.get('', ChatRoom);

export = router;
