import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: {
        allFavorite: [],
        favoriteTotal: 0
    },
    reducers: {
        saveFavoriteAction: (state, action) => {
            // {dasdasd}
            let copyArray = [...state.allFavorite];

            let findIndex = null;

            copyArray.find((item,index) => {
                if(item.id === action.payload.id){
                    findIndex = index
                    return;
                }
            })

            if(findIndex === null){
                copyArray.push(action.payload);
                state.favoriteTotal++
            }else{
                copyArray.splice(findIndex,1);
                state.favoriteTotal--;
            }

            state.allFavorite = copyArray;


        }
    }
})

export const {saveFavoriteAction} = favoriteSlice.actions;
export default favoriteSlice.reducer;