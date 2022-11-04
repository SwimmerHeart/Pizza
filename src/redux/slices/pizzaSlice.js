import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async ({basicUrl, currentPage, category, sortBy, order, search}) => {
        // const {basicUrl, currentPage, category, sortBy, order, search} = params
        const {data} = await axios.get(`${basicUrl}?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&search=${search}`)
        return data
    }
)

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState: {
        items: [],
        status: 'loading'
    },
    reducers: {
        setPizzas: (state, action) => {
           state.items = action.payload
        }
    },
    extraReducers: {
        [fetchPizzas.fulfilled]: (state, action)=>{
            state.items = action.payload
            state.status = 'success'
            console.log('все ок')
        },
        [fetchPizzas.pending]: (state)=>{
            state.items = []
            state.status = 'loading'
            console.log('идет отправка запроса')
        }
        ,[fetchPizzas.rejected]: (state)=>{
            state.items = []
            state.status = 'error'
            console.log('была ошибка получения')
        }
    }
})


export const {setPizzas} = pizzaSlice.actions
export default pizzaSlice.reducer