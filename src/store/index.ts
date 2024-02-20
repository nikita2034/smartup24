import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import userReducer from '../features/user/userSlice';
import createUserReducer from '../features/createUser/createUserSlice'
import productsReducer from '../features/products/ProductsSlice'
import pagesReducer from './slices/pageSlice'
import parthersReducer from '../features/partners/partnersSlice'
import suppliersReducer from '../features/suppliers/SuppliersSlice';
import productsFilterReducer from '../features/productsFilters/productsFiltersSlice';
import favoritesProductsReducer from '../features/userCart/favoritesProductsSlice'
import cartReducer from '../features/userCart/userCartSlice'
import addingToPartnersReducer from '../features/adding_to_partners/addingToPartnersSlice';
import productByIdReducer from '../features/products/productByIdSlice';
import productsCountReducer from '../features/products/productsCountSlice';
import filtersReducer from '../features/filters/filtersSlice';
import { persistReducer } from 'redux-persist'

import persistConfig from '../redux/Persist'
import partnerRequestsReducer from '../features/partner_requests/partnerRequestsSlice'
// import thunk from 'redux-thunk'; 


import authReducer from '../features/Auth/authSlice'
import { registerAsync, loginAsync } from '../features/Auth/authAsync';

const rootReducer = combineReducers({
    user:userReducer,
    createUser: createUserReducer,
    cart: cartReducer,
    products:productsReducer, 
    page:pagesReducer,
    suppliers:suppliersReducer,
    partners:parthersReducer,
    partnerRequests:partnerRequestsReducer,
    addingToPartners:addingToPartnersReducer,
    productsFilter:productsFilterReducer,
    favoritesProducts: favoritesProductsReducer,
    productById:productByIdReducer,
    productsCount:productsCountReducer,
    filters:filtersReducer,
    auth: authReducer,
    // Add other reducers here
  });


const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    // middleware: [thunk],
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { registerAsync, loginAsync },
      },
    }),
  });

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;