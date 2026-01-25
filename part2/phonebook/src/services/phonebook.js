import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons"




const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then((response) => response.data)
}


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}


const deleteEntry = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then((response) => response.data)
}

const alterEntry = (person, newNumber) => {
    console.log(person)
    const request = axios.put(`${baseUrl}/${person.id}`, {
        name: person.name,
        number: newNumber,
        id: person.id
    })
    return request.then((response) => response.data)
}


export default {
  create,
  getAll,
  deleteEntry,
  alterEntry
}
