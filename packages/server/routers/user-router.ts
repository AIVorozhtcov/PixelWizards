import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/user-controller';

const userRouter = Router();

userRouter.post('/reigster', registerUser);
userRouter.post('/login', loginUser);

export default userRouter;
