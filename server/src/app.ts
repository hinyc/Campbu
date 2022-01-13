import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/index';
import { createConnection } from 'typeorm';
import http from 'http';
import Socket from './controllers/socket/Socket';

const app = express();
export const server = http.createServer(app);
const port = 5050;

createConnection()
  .then(async (connection) => {
    console.log('DB connected!');
  })
  .catch((error) => {
    console.log(error);
  });

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/socket.io', Socket);
app.use('/', router);
app.get('/', (req, res) => {
  res.send('Hello code!');
});

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
