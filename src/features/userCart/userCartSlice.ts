import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../products/ProductsSlice";

interface CartItem extends Product {
  quantityItem: number;
}

interface CartState {
  cartWithProductInfo: CartItem[];
  loading: boolean;
  error: string | null;
}

export const fetchCartWithProductInfo = createAsyncThunk(
  "cart/fetchCartWithProductInfo",
  async (_, { dispatch }) => {
    try {
      const cartResponse = await axios.get(
        `http://localhost:3500/user/651c51ea284dfbe21b627c33/cart`
      );
      const cartItems: CartItem[] = cartResponse.data.cart.map((item: any) => ({
        item,
      }));
      console.log(cartResponse.data.cart);
      dispatch(cartSlice.actions.setCartWithProductInfo(cartItems));
    } catch (error) {
      console.error(
        "Ошибка при получении корзины с полной информацией о товарах:",
        error
      );
      // Обработка ошибок, если необходимо
    }
  }
);

export const updateCartItemQuantityInCart = createAsyncThunk(
  "cart/updateCartItemQuantityInCart",
  async ({ userId, productId, newQuantity }: { userId: string; productId: string; newQuantity: number }, { dispatch }) => {
    try {
      const response = await axios.put(`http://localhost:3500/user/update/${userId}/${productId}`, { quantity: newQuantity });
      dispatch(fetchCartWithProductInfo()); // Обновляем данные корзины после успешного обновления товара
      return response.data;
    } catch (error) {
      console.error("Ошибка при обновлении количества товара в корзине:", error);
      throw error;
    }
  }
);


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartWithProductInfo: [],
    loading: false,
    error: null,
  } as CartState,
  reducers: {
    setCartWithProductInfo: (state, action: PayloadAction<CartItem[]>) => {
      state.cartWithProductInfo = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartWithProductInfo.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { setCartWithProductInfo } = cartSlice.actions;
export default cartSlice.reducer;
