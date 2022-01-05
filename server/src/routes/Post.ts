import express from 'express';
const router = express.Router();
const newpost = require('./../controllers/post/Newpost');

// router.get('/:postId', (req, res) => {
//   console.log(req.params);
//   res.status(200).json({ messege: 'ok?' });
// });
router.post('/newpost', newpost);
// router.patch('/:postId');

export = router;
