import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch();

    const processAnecdoteForm = async (event) => {
        
        event.preventDefault()
        const anecdote = event.target.anecdote.value;
        event.target.anecdote.value = ''
        dispatch(addAnecdote(anecdote))

        //Notification
        dispatch(setNotification(`Voted on '${anecdote}'`))

    }


    return(
        <>
            <h2>create new</h2>
            <form onSubmit={processAnecdoteForm}>
                <div><input name="anecdote"/></div>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default AnecdoteForm