import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNewAnecdote = async (anec) => {
    const response = await axios.post(baseUrl,{
      content : anec,
      votes : 0
    })
    return response.data
  }

const updateAnecdote = async (anec) => {
  const response = await axios.put(`${baseUrl}/${anec.id}`,{...anec, votes : anec.votes + 1})
  return response.data
}  

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll,createNewAnecdote,updateAnecdote }