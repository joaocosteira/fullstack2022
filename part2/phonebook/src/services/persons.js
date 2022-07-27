/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
//const baseUrl = 'https://thawing-springs-50406.herokuapp.com/api/persons'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const deleteContact = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default{ getAll,create,deleteContact,update }