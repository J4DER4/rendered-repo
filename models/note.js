const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')

mongoose.set('strictQuery', false)

console.log('Connecting to:', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(result =>{
        logger.info('Connection established')
    })
    .catch(error =>{
        logger.error('Error during connection:', error.message)
    })

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true
    },
    important: Boolean,
})

noteSchema.set('toJSON', {
    transform: (_document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)
