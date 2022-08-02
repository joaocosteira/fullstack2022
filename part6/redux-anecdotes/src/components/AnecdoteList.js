import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, sendNotification } from '../reducers/notificationReducer'

const filterSearched = ({ searchTerm },anecdotes) => searchTerm === '' ? 
    anecdotes : 
    anecdotes.filter(a => a.content.toLowerCase().includes(searchTerm.toLowerCase()))
    
const AnecdoteList = () =>{

    const anecdotes = useSelector(state => state.anecdotes)
    const searchTerm = useSelector(state => state.searchTerm)
    const anecdotesToShow = filterSearched(searchTerm,anecdotes.slice()).sort((a,b) => b.votes - a.votes)
    const dispatch = useDispatch()

    const vote = (anecdote) => {

        const id = anecdote.id
        dispatch(voteAnecdote(id))
        dispatch(sendNotification(`you voted '${anecdote.content}'`))
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