import {configureStore} from "@reduxjs/toolkit"
import Theme from "../Slice/Theme"


export const store = configureStore ({
    reducer:{
        theme: Theme
    }
})