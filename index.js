
const express = require('express')
const morgan = require('morgan')
const config = require('./utils/config')
const logger = require('./utils/logger')
// const cors = require('cors')


const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malofoy draco kakka' })
    } else if (error.name === 'ValidationError') { // catch wrong post requests
        return response.status(400).json({ error: error.message })
    }

    next(error)
}
const app = express()
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('dev'))
// app.use(cors())


const UnkownEndpoint = (request, response) => {
    response.status(404).send({ error: "Unkown Endpoint" })
}



app.use(UnkownEndpoint)
app.use(errorHandler)

app.listen(config.PORT, () => {
    logger.info('Server running on port:' + config.PORT + ' TIME: ' + Date.now())
})

