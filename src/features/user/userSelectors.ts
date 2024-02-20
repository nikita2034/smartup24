import { RootState } from "../../store";
export const selectUser = (state: RootState) => state.user.user;
export const selectUserId = (state: RootState) => state.user.user?.id;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;
export const selectUserCart = (state: RootState) => state.user.user?.cart;
export const selectUserSelectedProducts = (state: RootState) => state.user.user?.favorites;