import { useState,useEffect } from "react"
import axios from 'axios'

export const useField = (type) => {

    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
}

export const useCountry = (name) => {

  const [country, setCountry] = useState(null)

  useEffect(() => {
    const searchCountry = async name =>{

        if(name){
            try{
                const searchedCountry = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
                setCountry(searchedCountry.data[0])
            }catch(e){
                setCountry(null)
            }
        }

    }
    searchCountry(name);
  },[name])

  return country
}
