import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/index';
import { createConnection } from 'typeorm';

const app = express();
const port = 5050;

createConnection()
  .then(async (connection) => {
    console.log('DB connected!');
  })
  .catch((error) => {
    console.log(error);
  });

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'OPTION', 'PATCH', 'DELETE'],
  }),
);
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
