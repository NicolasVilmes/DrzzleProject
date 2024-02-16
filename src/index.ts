import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import { router as potsRouter } from './routes/posts';
import { router as UsersRouter } from './routes/users';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: false }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const Api_PREFIX = '/api';
app.use(`${Api_PREFIX}/posts`, potsRouter)
app.use(`${Api_PREFIX}/users`, UsersRouter)


app.listen(port, () =>
  console.log(`🚀 Server listening at http://localhost:${port}`)
);
