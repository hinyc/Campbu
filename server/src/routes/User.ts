import express from 'express';
const router = express.Router();

router.get('/signup/:email');
router.post('/signup');
router.post('/login');
router.post('/likes');
router.post('/review');

export = router;
