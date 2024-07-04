import {configureStore} from '@reduxjs/toolkit';
// slices
import productsSlice from './productsSlice';
import cartSlice from './cartSlice';
import favoriteSlice from './favoriteSlice';

const store = configureStore({
    reducer:{
        productStore: productsSlice,
        cartStore: cartSlice,
        favoriteStore: favoriteSlice
    }
})

export default store;