import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import './index.css'

const App = () => {
  const baseUrl = 'http://localhost:3001/persons/'

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [messageType, setMessageType] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const loadMessage = (m, mt) => {
    setMessage(m)
    setMessageType(mt)

    setTimeout(() => {
      setMessage('')
      setMessageType('')
    }, 3000)
  }

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
          .then(res => {
            loadMessage(`Updated ${updatePerson.name}'s number`, 'success')
          })
          .catch(res => {
            loadError(updatePerson.name)
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
      .then(res => {
        loadMessage(`Added ${newPerson.name}`, 'success')
      })
      .catch(res => {
        loadError(newPerson.name)
      })
  }

  const loadError = (name) => {
    loadMessage(`Information of ${name} has already been removed from server`, 'error')
    setPersons(persons.filter(person => person.name !== name))
  }


  const handleDelete = (name, id) => {
    if (window.confirm(`Delete ${name}`)) {
      axios
        .delete(`${baseUrl}${id}`)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .then(res => {
          loadMessage(`${name} has been deleted`, 'success')
        })
        .catch(res => {
          loadError(name)
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
      <Notification message={message} messageType={messageType} />
      <Filter value={filterName} onChange={handleFilter} />
      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} addEntry={addEntry} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterName={filterName} handleDelete={handleDelete} />
    </div>
  )
}

export default App
