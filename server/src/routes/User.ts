import express from 'express';
const router = express.Router();
import signupController from '../controllers/user/Signup';
import loginController from '../controllers/user/Login';
import logoutController from '../controllers/user/Logout';
import likesController from '../controllers/user/Likes';

router.get('/signup/:email', signupController.get);
router.post('/signup', signupController.post);
router.post('/login', loginController);
router.get('/logout', logoutController);
router.post('/likes', likesController);
router.post('/review');

export = router;
