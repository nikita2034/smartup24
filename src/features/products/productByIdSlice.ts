import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from './ProductsSlice';
interface ProductState {
  loading: boolean;
  error: string | null;
  product: Product|null; // Тип данных продукта (IProduct) нужно указать здесь
}

const initialState: ProductState = {
  loading: false,
  error: null,
  product: null,
};

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (productId: string, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:3500/products/${productId}`); // Замените на свой URL эндпоинта
      return response.data.product; // Здесь используйте конкретное поле, где хранится продукт
    } catch (error:any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default productSlice.reducer;