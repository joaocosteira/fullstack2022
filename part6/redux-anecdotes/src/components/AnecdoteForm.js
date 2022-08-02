import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { removeNotification, sendNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {

    const dispatch = useDispatch();

    const processAnecdoteForm = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value;
        event.target.anecdote.value = ''

        //Notification
        dispatch(addAnecdote(anecdote))
        dispatch(sendNotification(`Voted on '${anecdote}'`))
        setTimeout(()=>{
            dispatch(removeNotification());
        },2000)

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