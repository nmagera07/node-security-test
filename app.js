const express = require('express')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const xss = require('xss-clean')
const cors = require('cors')
const UsersRouter = require('./users/users-router')

const app = express()

const limit = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests'
})

app.use(helmet())
app.use(express.json({ limit: '10kb'}))
app.use(cors())
app.use(xss())

app.use('/test', limit, UsersRouter)

app.get('/', (req, res) => {
    res.status(200).json({ message: "You are connected"})
})

module.exports = app
