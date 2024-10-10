import { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
} from '../controllers/user-controller';

const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
userRouter.post('/getUser', getUser);

export default userRouter;
