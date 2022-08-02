import { useState } from 'react'
import anecdotesList from './data/anecdotes'
import Footer from './components/Footer'
import About from './components/About'
import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import Menu from './components/Menu'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'
import { Route, Routes,useMatch } from 'react-router-dom'



const App = () => {

  const [anecdotes, setAnecdotes] = useState(anecdotesList)
  const [notification, setNotification] = useState(null)

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const sendNotification = (msg,delay=2) =>{
    setNotification(msg)
    setTimeout(()=>{
      setNotification(null)
    }, delay*1000)
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match 
  ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
  : null
  
  console.log(notification)
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/create" element={<CreateNew addNew={addNew} sendNotification={sendNotification}/>}/>
        <Route path="/anecdotes/:id" element={
          <Anecdote 
            anecdote={anecdote} 
            vote={()=>{vote(anecdote.id)}}
            sendNotification={sendNotification}
          />} 
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
