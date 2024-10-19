import { configureStore, createReducer } from "@reduxjs/toolkit";
import productSlice from  './slices/productSlice'
import wishlistSlice from './slices/wishlistSlice'
import cartSlice from './slices/cartSlice'


const cartStore = configureStore({
    reducer:{
              productReducer : productSlice,
              wishlistReducer : wishlistSlice,
             CartReducer :cartSlice
    }
})
export default cartStore