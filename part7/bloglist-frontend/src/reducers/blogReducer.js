import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState : [],
  reducers : {
    setBlogs : (state,action) => {
      return action.payload
    },
    appendBlog : (state, action) => {
      state.push(action.payload)
    },
    updateBlog : (state,action) => {
      return state.map(a => a.id === action.payload.id ? action.payload : a)
    },
    removeBlogByID : (state,action) => {
      return state.filter(a => a.id !== action.payload )
    }
  }
})

export const { updateBlog, setBlogs, appendBlog, removeBlogByID } = blogSlice.actions


export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    });
    dispatch(updateBlog(updatedBlog))
  }
}

export const addCommentToBlog = (blog,comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      comments : [...blog.comments,comment],
      user: blog.user.id
    });
    dispatch(updateBlog(updatedBlog))
  }
}

export const removeBlog = id => {
  return async dispatch => {
    await blogService.deleteBlog(id);
    dispatch(removeBlogByID(id))
  }
}

export default blogSlice.reducer