import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
    id: number;
    title: string;
    trademark: string;
    caviar: string;
    barcode: string;
    supplier: string;
    price_per_box: number;
    weight: number;
    quantity_per_box:number;
    quantity:number;
    photos: [string];
}

export interface ProductsState {
  products: Product[];
  idSelectedProduct: number, 
}

const initialState: ProductsState = {
  products: [
  {id:1,title:'Шоколад',trademark:'Спартак',caviar:'11231',barcode:'12312sdfsd123123',supplier:'Местное извезстное',price_per_box:20,weight:80,quantity_per_box:100,quantity:3, photos:['/img/milka.jpg']},
  {id:2,title:'Зефир',trademark:'Спартак',caviar:'11231',barcode:'12312sdfsd123123',supplier:'Местное извезстное',price_per_box:20,weight:80,quantity_per_box:100,quantity:1, photos:['/img/milka.jpg']},
  {id:3,title:'Леденец',trademark:'Спартак',caviar:'11231',barcode:'12312sdfsd123123',supplier:'Местное извезстное',price_per_box:20,weight:80,quantity_per_box:100,quantity:1, photos:['/img/milka.jpg']},
  {id:4,title:'Макароны',trademark:'Спартак',caviar:'11231',barcode:'12312sdfsd123123',supplier:'Местное извезстное',price_per_box:20,weight:80,quantity_per_box:100,quantity:1, photos:['/img/milka.jpg']},
  {id:5,title:'Шоколад',trademark:'Спартак',caviar:'11231',barcode:'12312sdfsd123123',supplier:'Местное извезстное',price_per_box:20,weight:80,quantity_per_box:100,quantity:1, photos:['/img/milka.jpg']},
  {id:6,title:'Шоколад',trademark:'Спартак',caviar:'11231',barcode:'12312sdfsd123123',supplier:'Местное извезстное',price_per_box:20,weight:80,quantity_per_box:100,quantity:1, photos:['/img/milka.jpg']},
  {id:7,title:'Шоколад',trademark:'Спартак',caviar:'11231',barcode:'12312sdfsd123123',supplier:'Местное извезстное',price_per_box:20,weight:80,quantity_per_box:100,quantity:1, photos:['/img/milka.jpg']},
  {id:8,title:'Шоколад',trademark:'Спартак',caviar:'11231',barcode:'12312sdfsd123123',supplier:'Местное извезстное',price_per_box:20,weight:80,quantity_per_box:100,quantity:1, photos:['/img/milka.jpg']}],
  idSelectedProduct: 0,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    addIdProduct: (state, action:PayloadAction<number>) => {
      state.idSelectedProduct=action.payload;
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
  },
});

export const {addProduct, removeProduct,addIdProduct } = productsSlice.actions;

export default productsSlice.reducer;