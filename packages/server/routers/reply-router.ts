import {
  createReply,
  deleteReply,
  getRepliesByComment,
  updateReply,
} from '../controllers/reply-controller';
import { Router } from 'express';

const replyRouter = Router();

replyRouter.get('/:commentId', getRepliesByComment);
replyRouter.post('/', createReply);
replyRouter.put('/:commentId', updateReply);
replyRouter.delete('/:commentId', deleteReply);

export default replyRouter;
