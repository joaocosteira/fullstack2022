import axios from 'axios'
import { useState } from "react"

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }

    const reset = (event) => {
        setValue('')
      }
  
    return {
      type,
      value,
      onChange,
      reset
    }
}



export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])


  const create = async (resource) => {

    try{
        const newResource = await axios.post(baseUrl,resource)
        setResources([...resources,newResource.data])
        return newResource.data
    }catch(e){
        console.log(e)
    }
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}