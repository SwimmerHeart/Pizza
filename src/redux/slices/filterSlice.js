import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        searchValue: '',
        categoryId: 0,
        sortType: {name: 'популярности', sortProperty : 'rating'},
        currentPage: 1
    },
    reducers: {
        setCategoryId: (state, action) => {
               state.categoryId = action.payload
        },
        setSortType: (state, action)=> {
            state.sortType = action.payload
        },
        setSearchValue: (state, action)=> {
            state.searchValue = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setFilters: (state, action) => {
            state.currentPage = Number(action.payload.currentPage)
            state.categoryId = Number(action.payload.categoryId)
            state.sortType.sortProperty = action.payload.sortType
        }

    }
})


export const { setCategoryId, setSortType, setCurrentPage,setFilters,setSearchValue } = filterSlice.actions

export default filterSlice.reducer