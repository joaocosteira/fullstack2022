import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    msg : null
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers : {
        sendNotification(state,action){
            return({ msg : action.payload })
        },
        removeNotification(state,action){
            return initialState
        }
    }
})


export const { sendNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
