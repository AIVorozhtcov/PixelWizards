import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import commentRouter from './routers/comment-router';
import topicRouter from './routers/topic-router';
import userRouter from './routers/user-router';
import { dbConnect } from './db';
import replyRouter from './routers/reply-router';

// Инициализация Express приложения
const app: Application = express();

// Настройка промежуточного ПО
app.use(bodyParser.json());

dbConnect().then(() => {
  // Настройка маршрутов
  app.use('/api/users', userRouter);
  app.use('/api/topics', topicRouter);
  app.use('/api/comments', commentRouter);
  app.use('/api/replies', replyRouter);

  // Обработка ошибок
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Что-то пошло не так!');
  });

  // Запуск сервера
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
  });
});
