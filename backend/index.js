const express = require('express')
const cors = require('cors')

const Entry = require('./models/note')

const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())


app.get('/', (request, response) => {
  response.send(`<h1>Hello World!</h1>`)
})

app.get('/info', (request, response) => {
  const count = `<p>Phonebook has info for ${persons.length} people</p>`
  const d = new Date()
  const date = `<p>${d.toString()}</p>`

  response.send(count + date)
})

app.get('/api/persons', (request, response) => {
  Entry.find({}).then(result => {
    response.json(result)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Entry.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => {
    next(error)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Entry.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const newPerson = request.body

  if (!newPerson) {
    return response.status(400).json({
      'error': 'content missing'
    })
  }

  const entry = new Entry({
    name: newPerson.name,
    number: newPerson.number
  })

  entry.save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  Entry.findByIdAndUpdate(request.params.id, request.body)
  .then(updatedBody => {
    response.json(updatedBody)
  })
  .catch(error => {
    next(error)
  })
})

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ 'error': 'malformed id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ 'error': error.message })
  }
  
  next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})