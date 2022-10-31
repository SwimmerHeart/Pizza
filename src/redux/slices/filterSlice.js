import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
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
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { setCategoryId, setSortType, setCurrentPage } = filterSlice.actions

export default filterSlice.reducer