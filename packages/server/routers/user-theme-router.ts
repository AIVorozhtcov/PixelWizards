import { Router } from 'express';
import {
  getUserThemeByUserId,
  updateUserTheme,
} from '../controllers/user-theme-controller';

const userThemeRouter = Router();

userThemeRouter.get('/:id', getUserThemeByUserId);
userThemeRouter.put('/:id', updateUserTheme);

export default userThemeRouter;
