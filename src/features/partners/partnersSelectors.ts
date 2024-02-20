import { RootState } from '../../store/index'; // Путь к вашему корневому редьюсеру
import { createSelector } from 'reselect'

export const selectPartners = (state: RootState) => state.partners.partners;
export const selectLoading = (state: RootState) => state.partners.loading;
export const selectError = (state: RootState) => state.partners.error;

export const selectPartnerById = createSelector(
    [selectPartners, (_, id) => id], // Массив селекторов и функций, которые мы будем использовать
    (partners, id) => {
      return partners.find((partner) => partner._id === id) || null;
    }
  );
