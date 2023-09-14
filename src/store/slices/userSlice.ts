import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определите начальное состояние
interface Product {
  id: number;
  title: string;
  trademark: string;
  caviar: string;
  barcode: string;
  supplier: string;
  price_per_box: number;
  weight: number;
  quantity_per_box:number;
  photos: string[];
}

interface OrdersState {
  orders: Product[];
}

interface UserState {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  cart: {
    orders: Product[]; // Здесь может быть ваш формат корзины товаров
  };
}

const initialState: UserState = {
  user: null,
  cart: {
    orders: [],
  },
};

// Создайте slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Редюсер для установки пользователя
    setUser: (state, action: PayloadAction<UserState['user']>) => {
      state.user = action.payload;
    },
    addOrder: (state, action: PayloadAction<Product>) => {
      state.cart.orders.push(action.payload);
    },
    removeOrder: (state, action) => {
      // Удаление заказа по какому-либо идентификатору заказа
      state.cart.orders = state.cart.orders.filter(order => order.id !== action.payload.id);
    },
    clearOrders: (state) => {
      state.cart.orders = [];
    },
  },
});

export const { setUser, addOrder, removeOrder, clearOrders } = userSlice.actions;

export default userSlice.reducer;