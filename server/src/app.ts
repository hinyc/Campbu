// const express = require('express');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/index';

const app = express();
const port = 5050;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/', router);
app.get('/', (req, res) => {
  res.send('Hello code!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
