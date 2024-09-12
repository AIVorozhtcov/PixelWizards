import jwt from 'jsonwebtoken';
import { Response, NextFunction, Request } from 'express';
import User from '../models/user';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.sendStatus(403);
    return;
  }

  const verifiedUser = jwt.verify(token, process.env.JWT_SECRET as string) as {
    id: number;
  };
  User.findOne({ where: { id: verifiedUser.id } })
    .then(user => {
      if (user) {
        (req as any).user = user;
        next();
        return;
      } else {
        return res.sendStatus(403);
      }
    })
    .catch(() => {
      return res.sendStatus(500);
    });
};

export default authMiddleware;
