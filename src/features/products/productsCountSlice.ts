import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Создаем Thunk для получения общего количества товаров
export const fetchProductCount = createAsyncThunk(
  'products/fetchProductCount',
  async () => {
    try {
      const response = await axios.get('http://localhost:3500/products/count/'); // Замените на ваш URL сервера
      return response.data.count;
    } catch (error) {
      throw Error('Could not fetch product count');
    }
  }
);

// Создаем slice для хранения состояния количества товаров
const productCountSlice = createSlice({
  name: 'productCount',
  initialState: {
    count: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductCount.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductCount.fulfilled, (state, action) => {
      state.loading = false;
      state.count = action.payload;
    });
    builder.addCase(fetchProductCount.rejected, (state) => {
      state.loading = false;
    //   state.error = 'Could not fetch product count';
    });
  },
});

export default productCountSlice.reducer;
