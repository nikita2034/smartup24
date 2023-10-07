import { RootState } from '../../store/index'; // Путь к вашему корневому редьюсеру

export const selectSuppliers = (state: RootState) => state.suppliers.suppliers;
export const selectLoading = (state: RootState) => state.suppliers.loading;
export const selectError = (state: RootState) => state.suppliers.error;

