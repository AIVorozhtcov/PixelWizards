import { Request, Response } from 'express';
import UserTheme from '../models/user-theme';

export const getUserThemeByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const userTheme = await UserTheme.findOne({ where: { userId } });
    if (userTheme) {
      res.json(userTheme);
    } else {
      if (await createUserTheme('dark', userId)) {
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
  const { theme } = req.body;
  try {
    const themeToUpdate = await UserTheme.findOne({ where: { userId } });
    if (themeToUpdate) {
      await themeToUpdate.update({ theme: theme });
      res.json(themeToUpdate);
    } else {
      if (await createUserTheme(theme, userId)) {
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

export const createUserTheme = async (theme: string, userId: string) => {
  try {
    await UserTheme.create({ theme, userId });
    return true;
  } catch (err) {
    console.error('Ошибка при создании темы пользователя');
    return false;
  }
};
