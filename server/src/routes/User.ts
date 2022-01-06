import express from 'express';
const router = express.Router();
import signupController from '../controllers/user/Signup';
import loginController from '../controllers/user/Login';
import logoutController from '../controllers/user/Logout';

router.get('/signup/:email', signupController.get);
router.post('/signup', signupController.post);
router.post('/login', loginController);
router.get('/logout', logoutController);
router.post('/likes');
router.post('/review');

export = router;
