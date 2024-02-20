import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from "axios";

export interface PartnerRequest {
  _id: number;
  title: string;
  logo: string;
  categories: string[]; // Предположим, что categories - это массив строк
}

interface PartnerRequestsState {
  partners_requests: PartnerRequest[];
  loading: boolean;
  error: string | null;
}

const initialState: PartnerRequestsState = {
  partners_requests: [],
  loading: false,
  error: null,
};

export const fetchPartnerRequests = createAsyncThunk(
  'partner_requests/fetchPartnerRequests',
  async () => {
    try {
      const response = await axios.get('http://localhost:3500/partner-requests/65592876239fc394be0cde6b');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const partnerRequestsSlice = createSlice({
  name: 'partnerRequests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartnerRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPartnerRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.partners_requests = action.payload;
      })
      .addCase(fetchPartnerRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default partnerRequestsSlice.reducer;