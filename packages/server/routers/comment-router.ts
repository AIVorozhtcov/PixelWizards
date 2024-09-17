import { Router } from 'express';
import {
  getCommentsByTopic,
  createComment,
  updateComment,
  deleteComment,
} from '../controllers/comment-controller';

const commentRouter = Router();

commentRouter.get('/:topicId', getCommentsByTopic);
commentRouter.post('/', createComment);
commentRouter.put('/:topicId', updateComment);
commentRouter.delete('/:topicId', deleteComment);

export default commentRouter;
