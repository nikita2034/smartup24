import { createSlice} from '@reduxjs/toolkit';

export interface Parthner {
    id: number;
    title: string;
    description: string;
    products: [];
    logo: string;
    fone: string,
    categories:[]
}

export interface ParthnersState {
    parthners: Parthner[];
}

const initialState:ParthnersState = {
    parthners: [
  {id:1,title:'Партнеры',description:" Местное известное - это поставщик правильного питания - всяпродукция натуральная выращена в экологических чистых местностях как в Беларуси так и за ее пределами." ,products:[],logo:'/img/milka.jpg',fone:'/img/milka.jpg',categories:[]},
  {id:2,title:'Партнеры',description:"sdfsdfsdfsdf",products:[],logo:'/img/milka.jpg',fone:'/img/milka.jpg',categories:[]},
  {id:3,title:'Партнеры', description:"sdfsdfsd",products:[],logo:'/img/milka.jpg',fone:'/img/milka.jpg',categories:[]},
  {id:4,title:'Партнеры',description:"fsdfsdfsdfsd" ,products:[],logo:'/img/milka.jpg',fone:'/img/milka.jpg',categories:[]},
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