//import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

    //const dispatch = useDispatch();

    const processAnecdoteForm = async (event) => {
        
        event.preventDefault()
        const anecdote = event.target.anecdote.value;
        event.target.anecdote.value = ''
        //dispatch(addAnecdote(anecdote))
        props.addAnecdote(anecdote)

        //Notification
        //dispatch(setNotification(`Voted on '${anecdote}'`))
        props.setNotification(`Voted on '${anecdote}'`)

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

//export default AnecdoteForm

const mapStateToProps = (state) => {
    return state
}  
const mapDispatchToProps = {
    addAnecdote,
    setNotification
  }  
  
//export default Filter
const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm