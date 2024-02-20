import { createSlice } from '@reduxjs/toolkit';
import { addSupplierToPartners } from './addingToPartnersAction';

const partnershipsSlice = createSlice({
  name: 'partnerships',
  initialState: {
    addSupplierStatus: 'idle', // 'idle', 'loading', 'succeeded', or 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSupplierToPartners.pending, (state) => {
        state.addSupplierStatus = 'loading';
      })
      .addCase(addSupplierToPartners.fulfilled, (state, action) => {
        state.addSupplierStatus = 'succeeded';
        state.error = null;
      })
      .addCase(addSupplierToPartners.rejected, (state, action) => {
        state.addSupplierStatus = 'failed';
        // state.error = action.error.message;
      });
  },
});

export default partnershipsSlice.reducer;