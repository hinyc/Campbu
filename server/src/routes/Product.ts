import express from 'express';
const router = express.Router();
const address = require('../controllers/product/Address');

router.get('/address/:addressId', address);
// router.get('/post/:postId');
// router.delete('/post/:postId');

export = router;
