import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    msg : null
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers : {
        setMessage(state,action){
            return({ msg : action.payload })
        }
    }
})


export const { setMessage } = notificationSlice.actions


export const setNotification = (message, time = 2) =>{
    return async dispatch =>{
        dispatch(setMessage(message))
        setTimeout(()=>{
            dispatch(setMessage(null))
        }, time * 1000)
    }
}

export default notificationSlice.reducer
