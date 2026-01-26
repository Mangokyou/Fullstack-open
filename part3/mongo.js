const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.connect(url, { family: 4 })

const PersonSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', PersonSchema)


if (process.argv.length === 2) {
  console.log('Phonebook: ')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    //console.log("closing database...")
    mongoose.connection.close()
  })
} else if (process.argv.length === 4) {
  const person = new Person({
    name: String(process.argv[2]),
    number: String(process.argv[3]),
  })
  person.save().then(() => {
    console.log(`added ${process.argv[2]} number ${process.argv[3]} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('Invalid Input')
  mongoose.connection.close()
}