import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import cartReducer from './slices/cartSlice'
import productsReducer from './slices/productsSlice'
import pagesReducer from './slices/pageSlice'
export const store=configureStore({
    reducer:{
        user:userReducer,
        cart: cartReducer,
        products:productsReducer, 
        page:pagesReducer
    }
})

export type RootState = ReturnType<typeof store.getState>