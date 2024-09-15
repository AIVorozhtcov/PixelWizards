import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserState, UserData } from '../../types';
import { SERVER_HOST } from '../../constants/serverHost';
import { RootState } from '../store';

const initialState: IUserState = {
  user: null,
};

export const fetchUserThunk = createAsyncThunk(
  'user/fetchUserThunk',
  async (_: void) => {
    const url = `${SERVER_HOST}/user`;
    return fetch(url).then(res => res.json());
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserThunk.pending.type, state => {
        state.user = null;
      })
      .addCase(
        fetchUserThunk.fulfilled.type,
        (state, { payload }: PayloadAction<UserData>) => {
          state.user = payload;
        }
      );
  },
});

export const { setUserData } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
