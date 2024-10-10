import { Request, Response } from 'express';
import UserTheme from '../models/user-theme';

export const getUserThemeByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const userIdInt = parseInt(userId, 10);
  try {
    const userTheme = await UserTheme.findOne({ where: { userId } });
    if (userTheme) {
      res.json(userTheme);
    } else {
      const creationResult = await createUserTheme('dark', userIdInt);
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
      await themeToUpdate.update({ themeName: theme });
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
  try {
    await UserTheme.create({ userId, themeName: theme });
    return true;
  } catch (err) {
    console.error('Ошибка при создании темы пользователя');
    return false;
  }
};
