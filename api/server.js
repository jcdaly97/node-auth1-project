const express = require('express')
const session = require('express-session')
const userRouter = require('../users/user-router')
const authRouter = require('../users/auth-router')

const server = express()
const sessionConfig = {
    cookie: {
        maxAge: 1000*120,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: true,
    name: 'cookie boy', 
    secret: 'numnumcookie'
}

server.use(session(sessionConfig))
server.use(express.json())
server.use('/api/users', userRouter)
server.use('/api/auth', authRouter)

module.exports = server