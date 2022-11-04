import {createSlice} from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        totalPrice: 0,
        items: []
    },
    reducers: {
        addItem: (state, action) => {
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
        minusItem(state, action) {
            const findIndex = state.items.find(item => item.id === action.payload.id)
            if (findIndex) {
                findIndex.count--
                state.totalPrice -= action.payload.price
            }
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload)
            state.totalPrice = state.items.reduce((acc, item) => {
                return acc + item.price * item.count
            }, 0)
        },
        clearItem: (state, action) => {
            state.totalPrice = 0
            state.items = []
        },
    }
})

export const selectCart = (state=>state.cart)
export const {addItem, removeItem, clearItem, minusItem} = cartSlice.actions

export default cartSlice.reducer