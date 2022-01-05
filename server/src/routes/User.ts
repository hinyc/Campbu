import express from 'express';
const router = express.Router();
import signupController from '../controllers/user/Signup';

router.get('/signup/:email', signupController.get);
router.post('/signup', signupController.post);
router.post('/login');
router.post('/likes');
router.post('/review');

export = router;
