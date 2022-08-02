import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchTerm : ''
}

const notificationSlice = createSlice({
    name: 'searchTerm',
    initialState,
    reducers : {
        updateSearchTerm(state,action){
            return({ searchTerm : action.payload })
        }
    }
})


export const { updateSearchTerm } = notificationSlice.actions
export default notificationSlice.reducer