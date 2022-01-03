import express from 'express';
const router = express.Router();

router.get('/account');
router.get('/product/borrow');
router.get('/product/lend');
router.get('/product/likes');
router.get('/product/post');
router.patch('/account');
router.delete('/account');

export = router;
