import { Request, Response } from 'express';
import UserTheme from '../models/user-theme';

export const getUserThemeByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log('userId is ' + userId);
  const userIdInt = parseInt(userId, 10);
  console.log('userIdInt is ' + userIdInt);
  try {
    const userTheme = await UserTheme.findOne({ where: { userId } });
    console.log(' here is found theme ' + userTheme);
    if (userTheme) {
      res.json(userTheme);
    } else {
      console.log('entry point');
      const creationResult = await createUserTheme('dark', userIdInt);
      console.log(creationResult);
      if (creationResult) {
        const newUserTheme = await UserTheme.findOne({ where: { userId } });
        if (newUserTheme) {
          res.json(newUserTheme);
        } else {
          res.status(404).json({ error: 'Тема пользователя не найдена' });
        }
      } else {
        res.status(404).json({ error: 'Тема пользователя не найдена' });
      }
    }
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении темы пользователя' });
  }
};

export const updateUserTheme = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const userIdInt = parseInt(userId, 10);
  const { theme } = req.body;
  try {
    const themeToUpdate = await UserTheme.findOne({ where: { userId } });
    if (themeToUpdate) {
      await themeToUpdate.update({ theme: theme });
      res.json(themeToUpdate);
    } else {
      if (await createUserTheme(theme, userIdInt)) {
        const newUserTheme = await UserTheme.findOne({ where: { userId } });
        if (newUserTheme) {
          res.json(newUserTheme);
        } else {
          res.status(404).json({ error: 'Тема пользователя не найдена' });
        }
      } else {
        res.status(404).json({ error: 'Тема пользователя не найдена' });
      }
    }
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при обновлении темы пользователя' });
  }
};

export const createUserTheme = async (theme: string, userId: number) => {
  console.log('func entered');
  try {
    console.log('user theme creation entered');
    await UserTheme.create({ userId, theme });
    console.log('User theme created');
    return true;
  } catch (err) {
    console.error('Ошибка при создании темы пользователя');
    return false;
  }
};
