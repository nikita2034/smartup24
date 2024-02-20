import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store"; // Путь до вашего store
import { Product } from "../products/ProductsSlice";
import axios from "axios";

interface FilterOptions {
  minPrice?: number;
  maxPrice?: number;
  categories?: string[];
  manufacturers?: string[];
  suppliers?: string[];
}

export const fetchFilteredProducts = createAsyncThunk(
  'products/fetchFiltered',
  async (filters:FilterOptions) => {
    console.log('Отправляем на сервер фильтры:', filters); // Логируем отправляемые фильтры
    try {
      const response = await axios.get('http://localhost:3500/products/filter', { params: filters });
      return response.data;
    } catch (error) {
      throw Error('Failed to fetch filtered products');
    }
  }
);


interface ProductsState {
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  filteredProducts: [],
  loading: false,
  error: null,
};

const productsFiltersSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFilteredProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFilteredProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.filteredProducts = action.payload;
    });
    builder.addCase(fetchFilteredProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const selectFilteredProducts = (state: RootState) => state.products.list;
export default productsFiltersSlice.reducer;
