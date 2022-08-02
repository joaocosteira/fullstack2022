const Anecdote = ({ anecdote,vote, sendNotification }) =>{

    const processVote = anecdote =>{
        vote()
        sendNotification(`You voted on '${anecdote.content}'`)
    }

    return(
        <>
            <h2>{anecdote.content} by {anecdote.author}</h2>
            <p>has {anecdote.votes} votes <button onClick={()=>{ processVote(anecdote) }}>vote</button></p>
            {anecdote.info && <p>for more info see <a href={anecdote.info} target="blank">{anecdote.info}</a></p> }
{/*             
            
            <p>for more info see <a href={anecdote.info} target="blank">{anecdote.info}</a></p>  */}
        </>
    )
}

export default Anecdote