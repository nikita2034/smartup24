
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Product } from '../products/ProductsSlice';
export interface Producta{
  quantity:number
  _id:Product
}
export interface User {
  id: string;
  fname: string;
  lname: string;
  cart:Producta[];
  favorites:Product[];
  partners:unknown[];
  partner_requests:unknown[];
  logo: string;
  title:string;
  role:string;
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
    removeFromCartRequest: (state) => {
      state.loading ='pending';
      state.error = null;
    },
    removeFromCartSuccess: (state) => {
      state.loading = 'pending';
    },
    removeFromCartFailure: (state, action: PayloadAction<string>) => {
      state.loading = 'pending';
      state.error = action.payload;
    },
  },
});

export const { userLoading, userLoaded, userError } = apiUserSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;
export const removeFromCartRequest = (state: RootState) => state.user.error;
export const removeFromCartSuccess = (state: RootState) => state.user.error;
export const  removeFromCartFailure = (state: RootState) => state.user.error;
export default apiUserSlice.reducer;