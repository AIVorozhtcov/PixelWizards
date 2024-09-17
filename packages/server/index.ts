import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import commentRouter from './routers/comment-router';
import topicRouter from './routers/topic-router';
import userRouter from './routers/user-router';
import { dbConnect } from './db';
import replyRouter from './routers/reply-router';
import authMiddleware from './middlewares/auth-middleware';
import cors from 'cors';

// Инициализация Express приложения
const app: Application = express();

// Настройка промежуточного ПО
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.get('/user', (_, res) => {
  res.json(MOCK_FORM_DEFAULT_VALUES);
});

dbConnect().then(() => {
  // Настройка маршрутов
  app.use('/api/users', userRouter);
  app.use('/api/topics', authMiddleware, topicRouter);
  app.use('/api/comments', authMiddleware, commentRouter);
  app.use('/api/replies', authMiddleware, replyRouter);

  // Обработка ошибок
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Что-то пошло не так!');
  });

  // Запуск сервера
  const PORT = process.env.SERVER_PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
  });
});
