import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAnecdotes, voteAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, sendNotification } from '../reducers/notificationReducer'
import anecdotesServices from '../services/anecdotes'

const filterSearched = ({ searchTerm },anecdotes) => searchTerm === '' ? 
    anecdotes : 
    anecdotes.filter(a => a.content.toLowerCase().includes(searchTerm.toLowerCase()))
    
const AnecdoteList = () =>{

    const anecdotes = useSelector(state => state.anecdotes)
    const searchTerm = useSelector(state => state.searchTerm)
    const anecdotesToShow = filterSearched(searchTerm,anecdotes.slice()).sort((a,b) => b.votes - a.votes)
    const dispatch = useDispatch()

    useEffect(()=>{
        anecdotesServices.getAll().then(r => { dispatch(setAnecdotes(r))})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const vote = async (anecdote) => {

        //const id = anecdote.id
        const updatedAnec = await anecdotesServices.updateAnecdote(anecdote)
        dispatch(voteAnecdote(updatedAnec))
        dispatch(sendNotification(`you voted '${updatedAnec.content}'`))
        setTimeout(()=>{
            dispatch(removeNotification());
        },2000)
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