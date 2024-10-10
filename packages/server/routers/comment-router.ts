import { Router } from 'express';
import {
  getCommentsByTopic,
  createComment,
  updateComment,
  deleteComment,
  updateReaction,
} from '../controllers/comment-controller';

const commentRouter = Router();

commentRouter.get('/:topicId', getCommentsByTopic);
commentRouter.post('/', createComment);
commentRouter.put('/:topicId', updateComment);
commentRouter.patch('/:topicId', updateReaction);
commentRouter.delete('/:topicId', deleteComment);

export default commentRouter;
