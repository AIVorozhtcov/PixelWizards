import { Request, Response } from 'express';
import Comment from '../models/comment';

export const createComment = async (req: Request, res: Response) => {
  const { content, topicId } = req.body;
  const userId = (req as any).user.id;
  try {
    if (!userId) res.status(403).json({ error: 'Пользователь не авторизован' });
    const newComment = await Comment.create({
      content,
      topicId,
      userId,
      reaction: null,
    });
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при создании комментария' });
  }
};

export const getCommentsByTopic = async (req: Request, res: Response) => {
  const { topicId } = req.params;
  try {
    const comments = await Comment.findAll({ where: { topicId } });
    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Ошибка при получении комментариев' });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  const { topicId } = req.params;
  const { content } = req.body;
  const userId = (req as any).user.id;
  if (!userId) res.status(403).json({ error: 'Неавторизованы' });

  try {
    const comment = await Comment.findByPk(topicId);
    if (comment && comment.userId === userId) {
      await comment.update({ content });
      res.json(comment);
    } else {
      res.status(403).json({ error: 'Нет прав на обновление комментария' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при обновлении комментария' });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const { topicId } = req.params;
  const userId = (req as any).user.id;
  if (!userId) res.status(403).json({ error: 'Пользователь не авторизован' });

  try {
    const comment = await Comment.findByPk(topicId);
    if (comment && comment.userId === userId) {
      await comment.destroy();
      res.json({ message: 'Комментарий удален' });
    } else {
      res.status(403).json({ error: 'Нет прав на удаление комментария' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при удалении комментария' });
  }
};
