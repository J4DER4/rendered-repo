
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const PORT = process.env.PORT || 3001

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

const generateId = () => {

    const newId = notes.length > 0 ?
        Math.max(...notes.map(n => Number(n.id))) : 0
    return String(newId + 1)

}

let notes = [
    {
        id: '1',
        content: 'this is indeed a note',
        important: true
    },
    {
        id: '2',
        content: 'well this is still a note',
        important: false
    }
]

app.get('/', (requrest, response) => {
    response.send('<h1>Hello poop</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (requrest, response) => {
    const id = requrest.params.id
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'Content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        id: generateId()
    }
    notes = notes.concat(note)

    console.log(note)
    console.log("New note added with id: " + note.id)

    response.json(note)
})
app.listen(PORT, () => {
    console.log('Server running on port:' + PORT + ' TIME: ' + Date.now())
})
