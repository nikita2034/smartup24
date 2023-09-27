import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ParthnerRequest {
    id: number;
    title: string;
    description: string;
    products: [];
    logo: string;
    fone: string,
    categories:[]
}

export interface ParthnersRequestState {
    parthnersRequest: ParthnerRequest[];
}

const initialState:ParthnersRequestState = {
    parthnersRequest: [
  {id:1,title:'Заявки на партнерство',description:" Местное известное - это поставщик правильного питания - всяпродукция натуральная выращена в экологических чистых местностях как в Беларуси так и за ее пределами." ,products:[],logo:'/img/milka.jpg',fone:'/img/milka.jpg',categories:[]},
  {id:2,title:'Заявки на партнерство',description:"sdfsdfsdfsdf",products:[],logo:'/img/milka.jpg',fone:'/img/milka.jpg',categories:[]},
  {id:3,title:'Заявки на партнерство', description:"sdfsdfsd",products:[],logo:'/img/milka.jpg',fone:'/img/milka.jpg',categories:[]},
  {id:4,title:'Заявки на партнерство',description:"fsdfsdfsdfsd" ,products:[],logo:'/img/milka.jpg',fone:'/img/milka.jpg',categories:[]},
  ]
};

const parthnersRequestSlice = createSlice({
  name: 'parthnersRequest',
  initialState,
  reducers: {
    // addProduct: (state, action: PayloadAction<Product>) => {
    //   state.products.push(action.payload);
    // }
  },
});

export const {} = parthnersRequestSlice.actions;

export default parthnersRequestSlice.reducer;