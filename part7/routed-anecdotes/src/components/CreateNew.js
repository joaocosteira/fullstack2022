//import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"


const CreateNew = (props) => {

    /*     
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('') 
    */
   const { reset : resetContent, ...content } = useField('text')
   const { reset : resetAuthor, ...author } = useField('text')
   const { reset : resetInfo, ...info } = useField('text')
    
    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content : content.value,
        author : author.value,
        info : info.value,
        votes: 0
      })
      props.sendNotification(`a new anecdote ${content} created!`)
      //setContent('');setAuthor('');setInfo('');
      navigate('/')
    }

    const reset = (e) =>{
      e.preventDefault();
      resetContent()
      resetAuthor()
      resetInfo()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>content <input {...content} /> </div>
          <div>author <input {...author} /> </div>
          <div>url for more info <input {...info} /> </div>
          <button>create</button>
          <button onClick={reset}>reset</button>
        </form>
      </div>
    )
  
  }

export default CreateNew