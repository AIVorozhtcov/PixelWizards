import { Router } from 'express';
import {
  getUserThemeByUserId,
  updateUserTheme,
} from '../controllers/user-theme-controller';

const userThemeRouter = Router();

userThemeRouter.get('/:userId', getUserThemeByUserId);
userThemeRouter.put('/:userId', updateUserTheme);

export default userThemeRouter;
