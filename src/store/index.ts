import {configureStore} from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
// import userReducer from './slices/userSlice'
import userReducer from '../features/user/userSlice';
// import cartReducer from './slices/cartSlice'
// import productsReducer from './slices/productsSlice'
import productsReducer from '../features/products/ProductsSlice'
import pagesReducer from './slices/pageSlice'
import parthersReducer from './slices/parthnersSlice'
import partnerRequestsReducer from './slices/partnerRequestsSlice';
import suppliersReducer from '../features/suppliers/SuppliersSlice';
// import suppliersReducer from './slices/suppliersSlice';
import { persistReducer } from 'redux-persist'
import persistConfig from '../redux/Persist'


const rootReducer = combineReducers({
    user:userReducer,
    // cart: cartReducer,
    products:productsReducer, 
    page:pagesReducer,
    suppliers:suppliersReducer,
    parthners:parthersReducer,
    parhhnerRequests:partnerRequestsReducer
    // Add other reducers here
  });
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
  });


// export const store=configureStore({
//     reducer:{
//         user:userReducer,
//         cart: cartReducer,
//         products:productsReducer, 
//         page:pagesReducer
//     }
// })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
