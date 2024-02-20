import { RootState } from '../../store/index'; // Путь к вашему корневому редьюсеру
import { createSelector } from 'reselect';

export const selectSuppliers = (state: RootState) => state.suppliers.suppliers;
export const selectLoading = (state: RootState) => state.suppliers.loading;
export const selectError = (state: RootState) => state.suppliers.error;
export const selectSupplierById = createSelector(
    [selectSuppliers, (_, id) => id], // Массив селекторов и функций, которые мы будем использовать
    (suppliers, id) => {
      return suppliers.find((supplier) => supplier._id === id) || null;
    }
  );
