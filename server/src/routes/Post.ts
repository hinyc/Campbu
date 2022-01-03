import express from 'express';
const router = express.Router();

router.get('/:postId', (req, res) => {
  console.log(req.params);
  res.status(200).json({ messege: 'ok?' });
});
// router.post('/newpost');
// router.patch('/:postId');

export = router;
