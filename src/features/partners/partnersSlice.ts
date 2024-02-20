// import { Parthner } from './../../store/slices/parthnersSlice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определите структуру данных для поставщика
export interface Parthner {
  _id: number;
  title: string;
  logo: string;
  categories:[]
}

interface PartnersState {
  partners: Parthner[];
  loading: boolean;
  error: string | null;
}

const initialState: PartnersState = {
    partners: [],
  loading: false,
  error: null,
};

const partnersSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {
    partnersLoading: (state) => {
      state.loading = true;
    },
    partnersLoaded: (state, action: PayloadAction<Parthner[]>) => {
      state.loading = false;
      state.partners = action.payload;
    },
    partnersError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },  
  }
});
export default partnersSlice.reducer;
export const { partnersLoading, partnersLoaded, partnersError} = partnersSlice.actions;