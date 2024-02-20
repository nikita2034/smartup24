import { createAsyncThunk } from '@reduxjs/toolkit';

interface AddSupplierRequest {
  userId: string;
  supplierId: string;
}

export const addSupplierToPartners = createAsyncThunk<string, AddSupplierRequest>(
  'partnerships/addSupplierToPartners',
  async ({ userId, supplierId }) => {
    try {
      // let ak=
      const response = await fetch('http://localhost:3500/suppliers/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, supplierId}),
      });

      if (response.status === 201) {
        return 'Поставщик добавлен в партнеры';
      } else {
        throw new Error('Ошибка при добавлении поставщика в партнеры');
      }
    } catch (error) {
      throw error;
    }
  }
);