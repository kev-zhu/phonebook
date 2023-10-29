import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import './main.css'

import phoneService from './services/phone'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [messageType, setMessageType] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    phoneService
      .getAll()
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

        phoneService.update(dupe.id, updatePerson)
          .then(response => {
            setPersons(persons.map(person => person.id === dupe.id ? updatePerson : person))
            setNewName('')
            setNewNumber('')
          })
          .then(res => {
            toggleModal()
            loadMessage(`Updated ${updatePerson.name}'s number`, 'success')
          })
          .catch(res => {
            loadError(res.response.data.error, updatePerson.name)
          })
      }
      return
    }

    const newPerson = {
      'name': newName,
      'number': newNumber,
      'id': Math.max(...persons.map(person => person.id)) + 1
    }

    phoneService.create(newPerson)
      .then(response => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
      })
      .then(res => {
        loadMessage(`Added ${newPerson.name}`, 'success')
        toggleModal()
      })
      .catch(res => {
        loadError(res.response.data.error, newPerson.name)
      })
  }

  const loadError = (errorMessage, name) => {
    loadMessage(errorMessage || `Information of ${name} has already been removed from server`, 'error')
    setPersons(persons.filter(person => person.name !== name))
  }


  const handleDelete = (name, id) => {
    if (window.confirm(`Delete ${name}`)) {
      phoneService.deletePhone(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .then(res => {
          loadMessage(`${name} has been deleted`, 'success')
        })
        .catch(res => {
          loadError(res.response.data.error, name)
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

  const toggleModal = () => {
    document.querySelector('.add-modal').classList.toggle('active')
  }

  return (
    <div className='container flex'>
      <div className='add-modal'>
        <div className='modal-content'>
          <span className="close" onClick={toggleModal}>&times;</span>
          <PersonForm newName={newName} newNumber={newNumber} addEntry={addEntry} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} toggleModal={toggleModal} />
        </div>
      </div>

      <div className='view flex'>
        <h1>
          <FontAwesomeIcon icon={faAddressBook} /> &nbsp;
          Phonebook
        </h1>
        <Notification message={message} messageType={messageType} />
        <h2 className='contact-header-row'>
          Contacts
          <button onClick={toggleModal}><span>+</span></button>
        </h2>



        <Filter value={filterName} onChange={handleFilter} />

        <Persons persons={persons} filterName={filterName} handleDelete={handleDelete} />
      </div>
    </div>

  )
}

export default App
