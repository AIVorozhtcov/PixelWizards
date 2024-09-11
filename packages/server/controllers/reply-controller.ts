import { Request, Response } from 'express';
import Reply from '../models/reply';

export const createReply = async (req: Request, res: Response) => {
  const { content, commentId, parentId } = req.body;
  const userId = (req as any).user.id;
  try {
    const newReply = await Reply.create({
      content,
      commentId,
      parentId,
      userId,
    });
    res.status(201).json(newReply);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при создании ответа' });
  }
};

export const getRepliesByComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  try {
    const replies = await Reply.findAll({ where: { commentId } });
    res.json(replies);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении ответов' });
  }
};

export const updateReply = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const userId = (req as any).user.id;

  try {
    const reply = await Reply.findByPk(commentId);
    if (reply && reply.userId === userId) {
      await reply.update({ content });
      res.json(reply);
    } else {
      res.status(403).json({ error: 'Нет прав на обновление ответа' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при обновлении ответа' });
  }
};

export const deleteReply = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const userId = (req as any).user.id;

  try {
    const reply = await Reply.findByPk(commentId);
    if (reply && reply.userId === userId) {
      await reply.destroy();
      res.json({ message: 'Ответ удален' });
    } else {
      res.status(403).json({ error: 'Нет прав на удаление ответа' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при удалении ответа' });
  }
};
