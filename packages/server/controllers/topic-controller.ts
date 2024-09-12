import { Request, Response } from 'express';
import Topic from '../models/topic';

export const createTopic = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const userId = (req as any).user.id;
  try {
    const newTopic = await Topic.create({ title, content, userId });
    res.status(201).json(newTopic);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при создании топика' });
  }
};

export const getTopics = async (_req: Request, res: Response) => {
  try {
    const topics = await Topic.findAll();
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении топиков' });
  }
};

export const getTopicById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const topic = await Topic.findByPk(id);
    if (topic) {
      res.json(topic);
    } else {
      res.status(404).json({ error: 'Топик не найден' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении топика' });
  }
};

export const updateTopic = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const topic = await Topic.findByPk(id);
    const userId = (req as any).user.id;
    if (topic && topic.userId === userId) {
      await topic.update({ title, content });
      res.json(topic);
    } else {
      res.status(403).json({ error: 'Нет прав на обновление топика' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при обновлении топика' });
  }
};

export const deleteTopic = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const topic = await Topic.findByPk(id);
    const userId = (req as any).user.id;

    if (topic && topic.userId === userId) {
      await topic.destroy();
      res.json({ message: 'Топик удален' });
    } else {
      res.status(403).json({ error: 'Нет прав на удаление топика' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при удалении топика' });
  }
};
