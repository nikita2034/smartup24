import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
// Определите структуру данных для поставщика
export interface Supplier {
  id: number;
  title: string;
  logo: string;
  categories:[]
}

interface SuppliersState {
  suppliers: Supplier[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SuppliersState = {
  suppliers: [],
  loading: 'idle',
  error: null,
};


export const fetchSuppliers = createAsyncThunk('suppliers/fetchSuppliers', async () => {
  // Здесь выполняется запрос к серверу и получение данных
  const response = await fetch('http://localhost:3200/suppliers'); // Замените на фактический маршрут на вашем сервере
  const data = await response.json();
  return data;
});
// Создайте асинхронное действие (async thunk) для загрузки списка поставщиков

export const fetchSuppliersAsync = createAsyncThunk('suppliers/fetchSuppliers', async () => {
  const response = await fetch('http://localhost:3200/suppliers'); // Замените на фактический маршрут на вашем сервере
  const data: Supplier[] = await response.json();
  return data;
});

const supplierSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliersAsync.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuppliersAsync.fulfilled, (state, action) => {
        // state.loading = false;
        state.suppliers = action.payload;
      })
      .addCase(fetchSuppliersAsync.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.error.message || 'An error occurred.';
      });
  },
});
export default supplierSlice.reducer;