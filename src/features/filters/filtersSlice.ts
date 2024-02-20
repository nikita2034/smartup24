// filtersSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface FiltersState {
  categories: string[];
  suppliers: string[];
  manufacturers: string[];
  loading: boolean;
  error: string | null;
}

const initialState: FiltersState = {
  categories: [],
  suppliers: [],
  manufacturers: [],
  loading: false,
  error: null,
};

export const fetchFilters = createAsyncThunk('filters/fetchFilters', async () => {
  try {
    const response = await axios.get('http://localhost:3500/products/filters_name'); // Подставьте свой маршрут
    return response.data;
  } catch (error) {
    throw error;
  }
});

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFilters.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload.categories;
      state.suppliers = action.payload.suppliers;
      state.manufacturers = action.payload.manufacturers;
    });
    builder.addCase(fetchFilters.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Ошибка при загрузке фильтров';
    });
  },
});

export const filtersActions = filtersSlice.actions;
export default filtersSlice.reducer;