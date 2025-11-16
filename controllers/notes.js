const notesRouter = require('express').router()
const Note = require('../models/note.js')


notesRouter.get('/', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

notesRouter.get('/:id', (requrest, response, next) => {
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

notesRouter.post('/', (request, response, next) => {
    const body = request.body

    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    note.save()
        .then(savedNote => {
            response.json(savedNote)
            logger.info(savedNote)
            logger.info("New note added")
        })
        .catch(err => next(err))
})

notesRouter.delete('/:id', (request, response, next) => {
    const id = request.params.id
    Note.findByIdAndDelete(id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/:id', (request, response, next) => {
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

module.exports = notesRouter
