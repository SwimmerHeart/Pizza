import {createSlice, PayloadAction} from '@reduxjs/toolkit'


type SortList = 'rating' | 'price' | 'title' | '-rating' | '-price' | '-title'
type RatingList = 'популярности+' | 'цене+' | 'алфавиту+' | 'популярности-' | 'цене-' | 'алфавиту-'
export type List = {
    name : RatingList,
    sortProperty : SortList
}

interface FilterSliceState {
    searchValue : string
    categoryId : number
    sortType :  List
    currentPage : number
}

const initialState:FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    sortType: {name: 'популярности+', sortProperty : 'rating'},
    currentPage: 1
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId: (state, action:PayloadAction<number>) => {
               state.categoryId = action.payload
        },
        setSortType: (state, action:PayloadAction<List>)=> {
            state.sortType = action.payload
        },
        setSearchValue: (state, action:PayloadAction<string>)=> {
            state.searchValue = action.payload
        },
        setCurrentPage: (state, action:PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setFilters: (state, action:PayloadAction<FilterSliceState>) => {
            state.currentPage = Number(action.payload.currentPage)
            state.categoryId = Number(action.payload.categoryId)
            state.sortType = action.payload.sortType
        }

    }
})


export const { setCategoryId, setSortType, setCurrentPage,setFilters,setSearchValue } = filterSlice.actions

export default filterSlice.reducer