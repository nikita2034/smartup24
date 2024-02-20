import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../products/ProductsSlice';

interface FavoriteProduct {
  productId: string;
  userId: string;
}

// Async Thunk для добавления товара в избранное
export const addToFavorites = createAsyncThunk(
  'favorites/addToFavorites',
  async ({ userId, productId }: FavoriteProduct, thunkAPI) => {
    try {
      const response = await axios.post(`http://localhost:3500/users/651c51ea284dfbe21b627c33/addToFavorites/${productId}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk для удаления товара из избранного
export const removeFromFavorites = createAsyncThunk(
  'favorites/removeFromFavorites',
  async ({ userId, productId }: FavoriteProduct, thunkAPI) => {
    try {
      const response = await axios.delete(`http://localhost:3500/users/651c51ea284dfbe21b627c33/removeFromCart/${productId}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk для получения избранных товаров
export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:3500/user/651c51ea284dfbe21b627c33/favoritesProducts`);
      return response.data; // Предполагается, что сервер вернет массив ID избранных товаров
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

interface FavoritesState {
  loading: boolean;
  error: string | null;
  favorites: Product[]; // Здесь вы можете указать тип, представляющий ID избранных товаров
}

const initialState: FavoritesState = {
  loading: false,
  error: null,
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Добавление товара в избранное
    builder.addCase(addToFavorites.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addToFavorites.fulfilled, (state, action) => {
      state.loading = false;
      state.favorites.push(action.payload.productId);
    });
    builder.addCase(addToFavorites.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Удаление товара из избранного
    builder.addCase(removeFromFavorites.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeFromFavorites.fulfilled, (state, action) => {
      state.loading = false;
      state.favorites = state.favorites.filter((id) => id !== action.payload.productId);
    });
    builder.addCase(removeFromFavorites.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Получение избранных товаров
    builder.addCase(fetchFavorites.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.loading = false;
      state.favorites = action.payload; // Предполагается, что payload будет массивом ID избранных товаров
    });
    builder.addCase(fetchFavorites.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default favoritesSlice.reducer;
