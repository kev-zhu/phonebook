import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const baseUrl = 'http://localhost:3001/persons/'

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addEntry = (e) => {
    e.preventDefault()

    const dupe = persons.find(person => person.name === newName)
    if (dupe) {
      const replaceNumber = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (replaceNumber) {
        const updatePerson = {
          ...dupe,
          "number": newNumber,
        }

        axios
          .put(`${baseUrl}${dupe.id}`, updatePerson)
          .then(response => {
            setPersons(persons.map(person => person.id === dupe.id ? updatePerson : person))
            setNewName('')
            setNewNumber('')
          })
      }
      return
    }

    const newPerson = {
      'name': newName,
      'number': newNumber,
      'id': Math.max(...persons.map(person => person.id)) + 1
    }

    axios
      .post(baseUrl, newPerson)
      .then(response => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleDelete = (name, id) => {
    if (window.confirm(`Delete ${name}`)) {
      axios
        .delete(`${baseUrl}${id}`)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilter = (e) => {
    setFilterName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterName} onChange={handleFilter} />
      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} addEntry={addEntry} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterName={filterName} handleDelete={handleDelete} />
    </div>
  )
}

export default App
