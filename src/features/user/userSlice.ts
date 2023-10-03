
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface User {
  id: number;
  name: string;
  // Другие поля пользователя
}

export interface ApiUserState {
  user: User | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ApiUserState = {
  user: null,
  loading: 'idle',
  error: null,
};

const apiUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoading: (state) => {
      state.loading = 'pending';
    },
    userLoaded: (state, action: PayloadAction<User>) => {
      state.loading = 'succeeded';
      state.user = action.payload;
      state.error = null;
    },
    userError: (state, action: PayloadAction<string>) => {
      state.loading = 'failed';
      state.error = action.payload;
    },
  },
});

export const { userLoading, userLoaded, userError } = apiUserSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;

export default apiUserSlice.reducer;