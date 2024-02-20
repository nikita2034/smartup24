import { Dispatch } from 'redux';
import { productsLoading, productsLoaded, productsError } from './ProductsSlice';
import { fetchProducts } from '../api/productsApi';
import { fetchSearchProducts } from '../api/searchApi';


export const getProducts = (page: number) => {
  console.log(page)
  return async (dispatch: Dispatch) => {
    try {
      dispatch(productsLoading());

      // Вычислите, с какого элемента начинать выборку, основываясь на номере страницы
      const itemsPerPage = 5;
      const startIndex = (page - 1) * itemsPerPage;

      // Здесь предполагается, что у вас есть функция fetchProducts, которая принимает начальный индекс и количество элементов
      const data = await fetchProducts(page, itemsPerPage);

      console.log(data);
      dispatch(productsLoaded(data));
    } catch (error) {
      const errorMessage = typeof error === 'string' ? error : 'An error occurred';
      dispatch(productsError(errorMessage));
    }
  };
};

// export const getSearchProducts = (query:string) => {
//   console.log(query)
//   return async (dispatch: Dispatch) => {
//     try {
//       dispatch(productsLoading());
//       const data = await fetchSearchProducts(query);
//       console.log(data)
//       dispatch(productsLoaded(data));
//     } catch (error) {
//       const errorMessage = typeof error === 'string' ? error : 'An error occurred';
//       dispatch(productsError(errorMessage));
//     }
//   };
// }