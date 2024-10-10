import { Request, Response } from 'express';
import Theme from '../models/theme';

export const createTheme = async (req: Request, res: Response) => {
  const { theme, description } = req.body;
  try {
    const newTheme = await Theme.create({ theme, description });
    res.status(201).json(newTheme);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при создании темы' });
  }
};

export const getThemes = async (_req: Request, res: Response) => {
  try {
    const themes = await Theme.findAll();
    res.json(themes);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении тем' });
  }
};

export const getThemeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const theme = await Theme.findByPk(id);
    if (theme) {
      res.json(theme);
    } else {
      res.status(404).json({ error: 'Тема не найдена' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении темы' });
  }
};

export const updateTheme = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { theme, description } = req.body;
  try {
    const themeToUpdate = await Theme.findByPk(id);
    if (themeToUpdate) {
      await themeToUpdate.update({ theme, description });
      res.json(themeToUpdate);
    } else {
      res.status(403).json({ error: 'Тема не найдена' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при обновлении темы' });
  }
};

export const deleteTheme = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const theme = await Theme.findByPk(id);
    if (theme) {
      await theme.destroy();
      res.json({ message: 'Тема удалена' });
    } else {
      res.status(403).json({ error: 'Нет прав на удаление темы' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при удалении темы' });
  }
};
