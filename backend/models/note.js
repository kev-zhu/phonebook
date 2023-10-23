const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)

const url = process.env.MONGO_DB_URI
console.log('connecting to mongoDB')

mongoose.connect(url)
  .then(result => {
    console.log('connected to mongoDB')
  })
  .catch(err => {
    console.log('error connecting to mongoDB: ', err.messsage)
  })

const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d*$/.test(v)
      }
    },
    required: true
  }
})

phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Entry', phoneSchema)