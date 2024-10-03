import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import dotenv from 'dotenv';

dotenv.config();

export const registerUser = async (req: Request, res: Response) => {
  const { login: username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Ошибка при регистрации пользователя. ' + err });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { login: username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
      res.json({ token });
    } else {
      res
        .status(401)
        .json({ error: 'Неправильное имя пользователя или пароль' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при аутентификации' });
  }
};

export const logoutUser = async (res: Response) => {
  res.status(200).json({ message: 'Успешный выход из системы' });
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const user = await User.findByPk(userId);

    if (!user) {
      res.status(404).json({ error: 'Пользователь не найден' });
      return;
    }

    res.status(200).json({ id: user.id, username: user.username });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении данных пользователя' });
  }
};
