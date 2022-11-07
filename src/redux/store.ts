import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice'
import cartReducer from './slices/cartSlice'
import pizzaReducer from './slices/pizzaSlice'
import {useDispatch} from "react-redux";

const store = configureStore({
    reducer: {
        filter: filterReducer,
        cart: cartReducer,
        pizzas : pizzaReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store