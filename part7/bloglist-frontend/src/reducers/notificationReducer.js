import { createSlice } from '@reduxjs/toolkit'


const initialState = { msg : null , style : null,  timeoutID : null }


const notificationSlice = createSlice({
  name : 'notification',
  initialState,
  reducers : {
    sendNotification(state,action){

      if(state.timeoutID !== null){
        clearTimeout(state.timeoutID);
      }
      return { timeoutID : null , msg : action.payload.msg, style : action.payload.style }
    },
    deleteNotification(){
      return initialState
    },
    setTimeoutNotification(state,action){
      return { ...state , timeoutID : action.payload }
    },
    clearTimeoutNotification(state){
      return { ...state , timeoutID : null }
    }
  }
})


export const {
  sendNotification,
  deleteNotification,
  setTimeoutNotification,
  clearTimeoutNotification
} = notificationSlice.actions

export const setNotification = (msg,style,senconds=2) => {

  return async dispatch => {
    dispatch(sendNotification({ msg, style }))

    const timeoutID = setTimeout(() => {
      dispatch(deleteNotification());
    }, 1000 * senconds)
    dispatch(setTimeoutNotification(timeoutID))
  }
}
export default notificationSlice.reducer