import { createSlice } from "@reduxjs/toolkit";


const ThemeSlice = createSlice({
    name: "theme",
    initialState: {
        darkMode : false
    },

    reducers:{
        toggleTheme : (state) =>{
            state.darkMode = !state.darkMode
        }
    }
})

export const {toggleTheme} = ThemeSlice.actions
export default ThemeSlice.reducer;