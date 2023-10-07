import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  _id: number;
  title: string;
  trademark: string;
  caviar: string;
  barcode: string;
  supplier: string;
  price_per_box: number;
  weight: number;
  quantity_per_box:number;
  quantity:number;
  photos: string;
  // Добавьте другие поля продукта
}

export interface ProductsState {
  list: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  list: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productsLoading: (state) => {
      state.loading = true;
    },
    productsLoaded: (state, action: PayloadAction<Product[]>) => {
      state.loading = false;
      state.list = action.payload;
    },
    productsError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },  
  },
});

export const { productsLoading, productsLoaded, productsError} = productsSlice.actions;

export default productsSlice.reducer;