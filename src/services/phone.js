import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'
// use bottom one for build SPA on backend
// const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson)
}

const update = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson)
}

const deletePhone = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const services = { getAll ,create, update, deletePhone }
export default services