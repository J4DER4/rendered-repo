const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as arg!')
    process.exit(1)
}
const password = process.argv[2]
const url = 'mongodb+srv://poopstack:' + password + '@cluster0.ndc3ai3.mongodb.net/jhondingus?retryWrites=true&w=majority&appName=Cluster0'

mongoose.set('strictQuery', false)

mongoose.connect(url)
//
const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})
const Note = mongoose.model('Note', noteSchema)
//
// const note = new Note({
//     content: 'jhon dingus supremacy',
//     important: true,
// })
//
// note.save().then(result => {
//     console.log('Note saved!')
//     console.log(result)
//     mongoose.connection.close()
// })
//
Note.find({}).then(result => {
    console.log("helloo!")

    result.forEach(note =>{
        console.log(note)
    })
    mongoose.connection.close()
})
