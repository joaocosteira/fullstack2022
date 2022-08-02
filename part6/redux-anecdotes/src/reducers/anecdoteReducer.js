//not necessary since we have a backend now
/* 
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
] 

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
const initialState = anecdotesAtStart.map(asObject)
*/

/**
 * Converted for the 6.15-6.18, since we want async action creators.
 */
/* const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){
    case("VOTE"):
      //return state.map(a => a.id === action.data.id ? { ...a, votes : a.votes + 1 } : a)
      return state.map(a => a.id === action.data.id ? action.data : a)
    case("ADD_ANECDOTE"):
      console.log("Add anec",action.data)
      return ([...state, action.data])
    case("SET_ANECDOTES"):
      return action.data
    default:
      return state
  }
}


// Action Creators:
export const voteAnecdote = (anecdote) =>(
  {
    type : "VOTE",
    data : anecdote
  }
)

export const addAnecdote = (anecdote) => (
  {
    type : "ADD_ANECDOTE",
    //data : asObject(anecdote)
    data : anecdote
  }
)

export const setAnecdotes = (anecdotes) => (
  {
    type : "SET_ANECDOTES",
    data : anecdotes
  }
) 
export default reducer

*/

import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState : [],
  reducers : {
    /*
    voteAnecdote : (state,action) => {
      return state.map(a => a.id === action.payload.id ? action.payload : a)
      },
       addAnecdote : (state,action) => {
        return ([...state, action.payload])
      }, */
      setAnecdotes : (state,action) => {
        return action.payload
      },
      appendAnecdote : (state, action) => {
        state.push(action.payload)
      },
      updateAnecdote : (state,action) =>{
        return state.map(a => a.id === action.payload.id ? action.payload : a)
      }
  }
})

export const { updateAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNewAnecdote(anecdote)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateAnecdote({...anecdote, votes : anecdote.votes + 1})
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer