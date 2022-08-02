import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {

    const dispatch = useDispatch();

    const processAnecdoteForm = (event) => {
        event.preventDefault()
        console.log("ADDD")
        dispatch(addAnecdote(event.target.anecdote.value))
        //console.log(event.target.anecdote)
        event.target.anecdote.value = ''
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