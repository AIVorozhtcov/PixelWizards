import { FORUM_PATHS, URLS } from '../../constants/apiConstants';
import { Data } from '../../types';
import {
  CommentSchema,
  CommentsSchema,
  ErrorSchema,
  MessageSchema,
  RepliesSchema,
  ReplySchema,
  TopicSchema,
  TopicsSchema,
} from '../../types/validationSchemas';
import {
  resultFromArraySchema,
  resultFromSchema,
} from '../../utils/resultFromSchema';
import BaseApi from './baseApi';

class ForumApi extends BaseApi {
  constructor() {
    super({ baseUrl: URLS.api });
  }

  async register(data: Data) {
    const response = await this.post(FORUM_PATHS.register, {
      data,
    });

    return await response.json();
  }

  async login(data: Data) {
    const response = await this.post(FORUM_PATHS.login, {
      data,
    });

    return await response.json();
  }

  async getTopics(token: string) {
    const response = await this.get(`${FORUM_PATHS.topics}`, {
      headers: {
        authorization: `Bearer ${token}`,
        extends: true,
      },
    });
    return resultFromArraySchema(TopicsSchema, ErrorSchema, response);
  }

  async getTopicById(id: number, token: string) {
    const response = await this.get(`${FORUM_PATHS.topics}/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
        extends: true,
      },
    });
    return resultFromSchema(TopicSchema, ErrorSchema, response);
  }

  async createTopic(data: { title: string; content: string }, token: string) {
    const response = await this.post(`${FORUM_PATHS.topics}`, {
      data,
      headers: {
        authorization: `Bearer ${token}`,
        extends: true,
      },
    });
    return resultFromSchema(TopicSchema, ErrorSchema, response);
  }

  async updateTopic(
    data: { id: number; title: string; content: string },
    token: string
  ) {
    const response = await this.post(`${FORUM_PATHS.topics}/${data.id}`, {
      data,
      headers: {
        authorization: `Bearer ${token}`,
        extends: true,
      },
    });
    return resultFromSchema(TopicSchema, ErrorSchema, response);
  }

  async deleteTopic(id: string, token: string) {
    const response = await this.delete(`${FORUM_PATHS.topics}/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
        extends: true,
      },
    });
    return resultFromSchema(MessageSchema, ErrorSchema, response);
  }

  async getCommentsByTopic(topicId: number, token: string) {
    const response = await this.get(`${FORUM_PATHS.comments}/${topicId}`, {
      headers: {
        authorization: `Bearer ${token}`,
        extends: true,
      },
    });
    return resultFromArraySchema(CommentsSchema, ErrorSchema, response);
  }

  async createComment(
    data: { topicId: string; content: string },
    token: string
  ) {
    const response = await this.post(`${FORUM_PATHS.comments}`, {
      data,
      headers: {
        authorization: `Bearer ${token}`,
        extends: true,
      },
    });
    return resultFromSchema(CommentSchema, ErrorSchema, response);
  }

  async updateComment(
    data: { topicId: number; content: string },
    token: string
  ) {
    const response = await this.put(`${FORUM_PATHS.comments}/${data.topicId}`, {
      data,
      headers: {
        authorization: `Bearer ${token}`,
        extends: true,
      },
    });
    return resultFromSchema(CommentSchema, ErrorSchema, response);
  }

  async updateReaction(
    data: { topicId: number; reaction: string },
    token: string
  ) {
    const response = await this.patch(
      `${FORUM_PATHS.comments}/${data.topicId}`,
      {
        data,
        headers: {
          authorization: `Bearer ${token}`,
          extends: true,
        },
      }
    );
    return resultFromSchema(CommentSchema, ErrorSchema, response);
  }

  async deleteComment(topicId: string, token: string) {
    const response = await this.delete(`${FORUM_PATHS.comments}/${topicId}`, {
      headers: {
        authorization: `Bearer ${token}`,
        extends: true,
      },
    });

    return resultFromSchema(MessageSchema, ErrorSchema, response);
  }

  async getRepliesByComment(commentId: number, token: string) {
    const response = await this.get(`${FORUM_PATHS.reply}/${commentId}`, {
      headers: {
        authorization: `Bearer ${token}`,
        extends: true,
      },
    });
    return resultFromArraySchema(RepliesSchema, ErrorSchema, response);
  }

  async createReply(
    data: { commentId: string; content: string },
    token: string
  ) {
    const response = await this.post(`${FORUM_PATHS.reply}`, {
      data,
      headers: {
        authorization: `Bearer ${token}`,
        extends: true,
      },
    });
    return resultFromSchema(ReplySchema, ErrorSchema, response);
  }

  async updateReply(
    data: { commentId: number; content: string },
    token: string
  ) {
    const response = await this.post(`${FORUM_PATHS.reply}/${data.commentId}`, {
      data,
      headers: {
        authorization: `Bearer ${token}`,
        extends: true,
      },
    });
    return resultFromSchema(ReplySchema, ErrorSchema, response);
  }

  async deleteReply(commentId: string, token: string) {
    const response = await this.delete(`${FORUM_PATHS.reply}/${commentId}`, {
      headers: {
        authorization: `Bearer ${token}`,
        extends: true,
      },
    });

    return resultFromSchema(MessageSchema, ErrorSchema, response);
  }
}

const forumApi = new ForumApi();

export default forumApi;
