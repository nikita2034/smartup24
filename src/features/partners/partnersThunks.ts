
import { fetchPartners } from '../api/partnersApi'; // Импортируйте функцию для запроса к серверу
import { Dispatch } from 'redux';
import { partnersLoading, partnersLoaded, partnersError } from './partnersSlice'

export const getPartners = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(partnersLoading());
      const data = await fetchPartners();
      // console.log(data);
      dispatch(partnersLoaded(data));
    } catch (error) {
      const errorMessage = typeof error === 'string' ? error : 'An error occurred';
      dispatch(partnersError(errorMessage));
    }
  };
};



