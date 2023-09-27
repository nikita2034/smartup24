import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Supplier {
    id: number;
    title: string;
    description: string;
    products: [];
    logo: string;
    fone: string,
    categories:[]
}

export interface SuppliersState {
  suppliers: Supplier[];
}

const initialState: SuppliersState = {
  suppliers: [
  {id:1,title:'Местное извезстное',description:" Местное известное - это поставщик правильного питания - всяпродукция натуральная выращена в экологических чистых местностях как в Беларуси так и за ее пределами." ,products:[],logo:'/img/milka.jpg',fone:'/img/milka.jpg',categories:[]},
  {id:2,title:'Местное извезстное',description:"sdfsdfsdfsdf",products:[],logo:'/img/milka.jpg',fone:'/img/milka.jpg',categories:[]},
  {id:3,title:'Местное извезстное', description:"sdfsdfsd",products:[],logo:'/img/milka.jpg',fone:'/img/milka.jpg',categories:[]},
  {id:4,title:'Местное извезстное',description:"fsdfsdfsdfsd" ,products:[],logo:'/img/milka.jpg',fone:'/img/milka.jpg',categories:[]},
  ]
};

const suppliersSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {
    // addProduct: (state, action: PayloadAction<Product>) => {
    //   state.products.push(action.payload);
    // }
  },
});

export const {} = suppliersSlice.actions;

export default suppliersSlice.reducer;