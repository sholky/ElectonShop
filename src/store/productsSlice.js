import {createSlice} from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'products',
    initialState: {
        allProducts: [],
        currentCategory: 'allProducts'
    },
    reducers: {
        saveAllProductsAction: (state, action) => {
            // console.log(action.payload);
            state.allProducts = action.payload;            
        },
        setNewCategory: (state, action) => {
            state.currentCategory = action.payload
        }
    }
})

export const {saveAllProductsAction,setNewCategory} = productSlice.actions;
export default productSlice.reducer;