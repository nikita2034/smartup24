import { RootState } from '../../store/index'; // 

export const selectAddSupplierStatus = (state:RootState) => state.addingToPartners.addSupplierStatus;
export const selectError = (state:RootState) => state.addingToPartners.error;