import jwt from 'jsonwebtoken';
import { Response, NextFunction, Request } from 'express';
import dotenv from 'dotenv';
import User from '../models/user';

dotenv.config();

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.sendStatus(403);
  }

  const userId = jwt.verify(token, process.env.JWT_SECRET as string);
  User.findOne({ where: { id: userId } })
    .then(user => {
      if (user) {
        (req as any).user = user;
        next();
      } else {
        return res.sendStatus(403);
      }
    })
    .catch(() => {
      return res.sendStatus(500);
    });
};

export default authMiddleware;
