import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeAnecdotes, voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const filterSearched = ({ searchTerm },anecdotes) => searchTerm === '' ? 
    anecdotes : 
    anecdotes.filter(a => a.content.toLowerCase().includes(searchTerm.toLowerCase()))
    
const AnecdoteList = () =>{

    const anecdotes = useSelector(state => state.anecdotes)
    const searchTerm = useSelector(state => state.searchTerm)
    const anecdotesToShow = filterSearched(searchTerm,anecdotes.slice()).sort((a,b) => b.votes - a.votes)
    const dispatch = useDispatch()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{ dispatch(initializeAnecdotes()) },[])

    const vote = async (anecdote) => {

        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`))

    }

    return(
        <>
            {anecdotesToShow.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList;