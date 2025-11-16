
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Note = require('./models/note.js')
// const cors = require('cors')

const PORT = process.env.PORT

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malofoy draco kakka' })
    }else if (error.name === 'ValidationError') { // catch wrong post requests
        return response.status(400).json({error: error.message})
    }

    next(error)
}
const app = express()
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('dev'))
// app.use(cors())

app.get('/', (requrest, response) => {
    response.send('<h1>Hello Jhon poop</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (requrest, response, next) => {
    const id = requrest.params.id
    Note
        .findById(id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }

        })
        .catch(err => next(err))
})

app.delete('/api/notes/:id', (request, response, next) => {
    const id = request.params.id
    Note.findByIdAndDelete(id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/notes', (request, response, next) => {
    const body = request.body

    const note = new Note({
        content: body.content,
        important: body.important || false,
    })
    note.save()
        .then(savedNote => {
            response.json(savedNote)
            console.log(savedNote)
            console.log("New note added")
        })
        .catch(err => next(err))
})

app.put('/api/notes/:id', (request, response, next) => {
    const { content, important } = request.body
    const id = request.params.id
    Note.findById(id)
        .then(note => {
            if (!note) {
                return response.status(404).end()
            }
            note.content = content
            note.important = important
            return note.save()
                .then((updatedNote) => {
                    response.json(updatedNote)
                })
        })
        .catch(err => next(err))
})

const UnkownEndpoint = (request, response) => {
    response.status(404).send({ error: "Unkown Endpoint" })
}



app.use(UnkownEndpoint)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log('Server running on port:' + PORT + ' TIME: ' + Date.now())
})

