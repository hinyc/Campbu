import express from 'express';
const router = express.Router();
import signupController from '../controllers/user/Signup'

router.get('/signup/:email');
router.post('/signup', signupController);
router.post('/login');
router.post('/likes');
router.post('/review');

export = router;
