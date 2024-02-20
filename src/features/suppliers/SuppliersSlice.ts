import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определите структуру данных для поставщика
export interface Supplier {
  _id: string;
  title: string;
  logo: string;
  categories:[]
}


interface SuppliersState {
  suppliers: Supplier[];
  loading: boolean;
  error: string | null;
}

const initialState: SuppliersState = {
  suppliers: [],
  loading: false,
  error: null,
};

const supplierSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {
    supplierLoading: (state) => {
      state.loading = true;
    },
    supplierLoaded: (state, action: PayloadAction<Supplier[]>) => {
      state.loading = false;
      state.suppliers = action.payload;
    },
    supplierError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },  
  }
});
export default supplierSlice.reducer;
export const {  supplierLoading,  supplierLoaded,  supplierError} = supplierSlice.actions;