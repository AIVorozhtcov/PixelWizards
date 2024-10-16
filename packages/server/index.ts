import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import commentRouter from './routers/comment-router';
import topicRouter from './routers/topic-router';
import userRouter from './routers/user-router';
import { dbConnect } from './db';
import replyRouter from './routers/reply-router';
import themeRouter from './routers/theme-router';
import userThemeRouter from './routers/user-theme-router';
import authMiddleware from './middlewares/auth-middleware';
import authForumMiddleware from './middlewares/auth-forum-middleware';
import cors from 'cors';
import { MOCK_FORM_DEFAULT_VALUES } from './mockProfileFormDefaultValues';

// Инициализация Express приложения
const app: Application = express();
const origin = [
  'http://158.160.21.142:3000',
  'http://capybara-pixelwizards-40.ya-praktikum.tech:3000',
  'http://localhost:3000',
];

// Настройка промежуточного ПО
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin }));

app.get('/user', (_, res) => {
  res.json(MOCK_FORM_DEFAULT_VALUES);
});

dbConnect().then(() => {
  // Настройка маршрутов
  app.use('/api/users', authForumMiddleware, userRouter);
  app.use('/api/topics', authMiddleware, topicRouter);
  app.use('/api/comments', authMiddleware, commentRouter);
  app.use('/api/replies', authMiddleware, replyRouter);
  app.use('/api/theme', themeRouter);
  app.use('/api/user-theme', userThemeRouter);

  // Обработка ошибок
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Что-то пошло не так!');
  });

  // Запуск сервера
  const PORT = process.env.SERVER_PORT || 3001;
  app.listen(PORT, () => {
    console.info(`Сервер запущен на порту ${PORT}`);
  });
});
