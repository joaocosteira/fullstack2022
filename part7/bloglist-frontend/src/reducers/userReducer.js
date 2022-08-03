import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
//import loginService from "../services/login";

const initialState = { user : null }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers : {
    setUser : (state,action) => {
      return { user : action.payload }
    }
  }
})

export const { setUser } = userSlice.actions


export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setUser(user))
    }
  }
}

export const logUser = (user) => {
  return async dispatch => {
    dispatch(setUser(user))
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem("loggedBlogAppUser");
    blogService.setToken(null);
    dispatch(setUser(null));
  }
}


export default userSlice.reducer