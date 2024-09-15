import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/user';
import topicMessagesSlice from './slices/topicMessages';

export const store = configureStore({
  reducer: { userSlice, topicMessagesSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
