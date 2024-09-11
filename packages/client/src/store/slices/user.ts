import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserState, UserData } from '../../types';

const initialState: IUserState = {
  user: {
    id: 0,
    first_name: '',
    second_name: '',
    display_name: '',
    phone: '',
    login: '',
    avatar: '',
    email: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
