const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('password required to add to mongoDB')
  console.log('name and number also required to add to mongoDB')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://kevinzhu35:${password}@cluster0.hsdcaw7.mongodb.net/PhonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Entry = mongoose.model('Entry', phoneSchema)

if (process.argv.length === 5) {
  const phone = new Entry({
    name: process.argv[3],
    number: process.argv[4]
  })
  phone.save().then(result => {
    console.log(`added ${phone.name} number ${phone.number} tp phonebook`)
    mongoose.connection.close()
  })
} else if (process.argv.length === 3) {
  const entries = Entry.find({}).then(result => {
    if (result.length === 0) {
      console.log('There are no entries in this phonebook')
    } else {
      console.log('phonebook:')
      result.forEach(entry => {
        console.log(entry.name, entry.number)
      })
    }
    mongoose.connection.close()
  })
} else {
  console.log('connect with password or password + new entry (name + number)')
  mongoose.connection.close()
}