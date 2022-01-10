import express from 'express';
import accountController from '../controllers/userinfo/account';
import productController from '../controllers/userinfo/product';
const router = express.Router();

router.get('/account', accountController.get);
router.get('/product/borrow');
router.get('/product/lend');
router.get('/product/likes');
router.get('/product/post');
router.patch('/account');
router.delete('/account');

export = router;
