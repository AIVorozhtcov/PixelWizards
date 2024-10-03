import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UserForum {
  userForum: { id: number; login: string };
}

const initialState: { userForum: UserForum | null } = {
  userForum: null,
};

export const userSlice = createSlice({
  name: 'userForum',
  initialState,
  reducers: {
    setUserForum: (state, action: PayloadAction<UserForum>) => {
      state.userForum = action.payload;
    },
  },
});

export const { setUserForum } = userSlice.actions;

export const selectUserForum = (state: RootState) =>
  state.userForum.userForum?.userForum;

export default userSlice.reducer;
