import { Router } from 'express';
import {
  createTheme,
  getThemes,
  getThemeById,
  updateTheme,
  deleteTheme,
} from '../controllers/theme-controller';

const themeRouter = Router();

themeRouter.get('/', getThemes);
themeRouter.get('/:id', getThemeById);
themeRouter.put('/:id', updateTheme);
themeRouter.delete('/:id', deleteTheme);
themeRouter.post('/', createTheme);

export default themeRouter;
