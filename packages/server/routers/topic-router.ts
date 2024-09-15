import {
  createTopic,
  deleteTopic,
  getTopicById,
  getTopics,
  updateTopic,
} from '../controllers/topic-controller';
import { Router } from 'express';

const topicRouter = Router();

topicRouter.get('/', getTopics);
topicRouter.get('/:id', getTopicById);
topicRouter.post('/', createTopic);
topicRouter.put('/:id', updateTopic);
topicRouter.delete('/:id', deleteTopic);

export default topicRouter;
