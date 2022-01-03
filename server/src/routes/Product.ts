import express from 'express';
const router = express.Router();

router.get('/address/:addressId');
router.get('/post/:postId');
router.delete('/post/:postId');

export = router;
