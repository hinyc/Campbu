import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/index';
import { createConnection } from 'typeorm';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const port = 5050;
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

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

io.on('connection', (socket) => {
  socket.emit('message', 'Welcome to ChatCord!');

  socket.broadcast.emit('message', 'A user has joined the chat');

  socket.on('disconnet', () => {
    io.emit('message', 'A user has left the chat');
  });
});

app.use('/', router);
app.get('/', (req, res) => {
  res.send('Hello code!');
});

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
