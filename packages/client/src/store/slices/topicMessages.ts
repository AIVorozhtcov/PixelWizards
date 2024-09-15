import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITopicMessages, ITopicMessagesState } from '../../types';

export const fetchTopicMessages = createAsyncThunk(
  'forum/messages',
  async (topicId: number) => {
    // const response = await generalAPI.topicMessages(id);
    const sleep = () => new Promise(res => setTimeout(res, 1000));

    await sleep();

    const fakeResponse = [
      {
        id: 1,
        text: 'Первое сообщение',
        reactions: {
          available: ['👍', '❤️', '😂'],
          current: null,
        },
      },
      {
        id: 2,
        text: 'Второе сообщение',
        reactions: {
          available: ['👍', '❤️', '😂'],
          current: null,
        },
      },
      {
        id: 3,
        text: 'Третье сообщение',
        reactions: {
          available: ['👍', '❤️', '😂'],
          current: '👍',
        },
      },
    ];

    return fakeResponse;
  }
);

export const setEmojiForBackend = createAsyncThunk(
  'forum/messages/emoji',
  async ({ messageId, emoji }: { messageId: number; emoji: string }) => {
    // const response = await generalAPI.setEmoji(messageId, emoji);
    const sleep = () => new Promise((res, rej) => setTimeout(res, 100));

    const fake = await sleep();

    return fake;
  }
);

const initialState: ITopicMessagesState = {
  topicMessages: 'Пока сообщений нет...',
};

export const topicMessagesSlice = createSlice({
  name: 'topicMessages',
  initialState,
  reducers: {
    setTopicMessages: (state, action: PayloadAction<ITopicMessages[]>) => {
      state.topicMessages = action.payload;
    },
    setCurrentEmoji: (
      state,
      action: PayloadAction<{ id: number; currentEmoji: string }>
    ) => {
      if (Array.isArray(state.topicMessages)) {
        const idOfMessage = state.topicMessages.find(
          message => message.id === action.payload.id
        );

        if (!idOfMessage)
          throw new Error('Упс, не удалось корректно установить реакцию...');

        idOfMessage.reactions.current = action.payload.currentEmoji;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTopicMessages.pending, (state, action) => {
      state.topicMessages = 'Загружаем доступные сообщения...';
    });
    builder.addCase(fetchTopicMessages.fulfilled, (state, action) => {
      if (Array.isArray(action.payload) && action.payload.length > 0) {
        state.topicMessages = action.payload;
      } else {
        state.topicMessages = initialState.topicMessages;
      }
    });

    builder.addCase(setEmojiForBackend.rejected, (_, action) => {
      if (!action.payload) {
        throw new Error('Error');
      }
    });
  },
});

export const { setTopicMessages, setCurrentEmoji } = topicMessagesSlice.actions;

export default topicMessagesSlice.reducer;
