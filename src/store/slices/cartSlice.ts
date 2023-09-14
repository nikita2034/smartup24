import { createSlice,PayloadAction } from '@reduxjs/toolkit'

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
    photos: [];
  }

interface OrdersState {
    orders: Product[];
}

const initialState: OrdersState= {
    orders: [],
};


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Product>) => {
            state.orders.push(action.payload);
          },
          removeOrder: (state, action) => {
            // Удаление заказа по какому-либо идентификатору заказа
            state.orders = state.orders.filter(order => order.id !== action.payload.id);
          },
          clearOrders: (state) => {
            state.orders = [];
          },
    }
})
export const { addOrder, removeOrder, clearOrders } = cartSlice.actions;
export default cartSlice.reducer;