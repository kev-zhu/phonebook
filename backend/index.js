const express = require('express')
const app = express()

app.use(express.json())

let persons = [
	{ 
		"id": 1,
		"name": "Arto Hellas", 
		"number": "040-123456"
	},
	{ 
		"id": 2,
		"name": "Ada Lovelace", 
		"number": "39-44-5323523"
	},
	{ 
		"id": 3,
		"name": "Dan Abramov", 
		"number": "12-43-234345"
	},
	{ 
		"id": 4,
		"name": "Mary Poppendieck", 
		"number": "39-23-6423122"
	}
]

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
	response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const target = persons.find(person => person.id === id)

	if (target) {
		response.json(target)
	} else {
		response.status(404).end()
	}
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter(person => person.id !== id)

	response.status(204).end()
})

app.post('/api/persons', (request, response) => {
	const newPerson = request.body

	if (!newPerson) {
		return response.status(400).json({
			'error': 'body content missing'
		})
	}

	if (!(newPerson.name && newPerson.number)) {
		return response.status(400).json({
			'error': 'name or number missing'
		})
	} else if (persons.find(person => person.name === newPerson.name)) {
		return response.status(400).json({
			'error': 'name must be unique'
		})
	}

	const randId = Math.floor(Math.random() * 1000000)
	newPerson.id = randId

	persons = persons.concat(newPerson)
	response.json(newPerson)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)