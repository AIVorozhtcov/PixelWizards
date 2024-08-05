import { createSlice } from '@reduxjs/toolkit';

interface IUserState {
  isLogin: boolean;
}

const initialState: IUserState = { isLogin: false };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
