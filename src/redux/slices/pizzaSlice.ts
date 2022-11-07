import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";

export type FetchPizzaParams = Record<string, string>

export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzaParams>(
    'pizza/fetchPizzasStatus',
    async ({basicUrl, currentPage, category, sortBy, order, search}) => {
        const {data} = await axios.get<PizzaItem[]>(`${basicUrl}?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&search=${search}`)
        return data
    }
)
export type PizzaItem = {
    imageUrl: string
    title: string
    types: number[]
    sizes: number[]
    price: number
    id: string
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface PizzaSliceState {
    items: PizzaItem[]
    status: Status
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setPizzas: (state, action: PayloadAction<PizzaItem[]>) => {
            state.items = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.items = []
            state.status = Status.LOADING
            console.log('идет отправка запроса')
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = Status.SUCCESS
            console.log('все ок')
        })
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.items = []
            state.status = Status.ERROR
            console.log('была ошибка получения')
        })
    },
})


export const {setPizzas} = pizzaSlice.actions
export default pizzaSlice.reducer