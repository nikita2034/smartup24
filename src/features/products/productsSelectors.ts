import { RootState } from "../../store";
import { createSelector } from 'reselect';

export const selectProducts = (state: RootState) => state.products.list
export const selectProductsLoading = (state: RootState) => state.products.loading;
export const selectProductsError = (state: RootState) => state.products.error;

export const selectProductById = createSelector(
    [selectProducts, (_, id) => id], // Массив селекторов и функций, которые мы будем использовать
    (products, id) => {
      return products.find((product) => product._id === id) || null;
    }
  );