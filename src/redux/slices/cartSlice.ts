import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";

export type CartItem = {
    id: string
    price: number
    title: string
    imageUrl: string
    type: number
    size: number
    count: number
}

interface CartSliceState {
    totalPrice: number
    items: CartItem[]
}

const initialState: CartSliceState = {
    totalPrice: 0,
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action:PayloadAction<CartItem>) => {
            const findIndex = state.items.find(item => item.id === action.payload.id)
            if (findIndex) {
                findIndex.count++
            } else {
                state.items.push({...action.payload, count: 1})
            }
            state.totalPrice = state.items.reduce((acc, item) => {
                acc += item.price * item.count
                return +acc
            }, 0)
        },
        minusItem(state, action:PayloadAction<CartItem>) {
            const findIndex = state.items.find(item => item.id === action.payload.id)
            if (findIndex) {
                findIndex.count--
                state.totalPrice -= action.payload.price
            }
        },
        removeItem: (state, action:PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload)
            state.totalPrice = state.items.reduce((acc, item) => {
                return acc + item.price * item.count
            }, 0)
        },
        clearItem: (state) => {
            state.totalPrice = 0
            state.items = []
        },
    }
})

export const selectCart = (state: RootState) => state.cart
export const {addItem, removeItem, clearItem, minusItem} = cartSlice.actions

export default cartSlice.reducer