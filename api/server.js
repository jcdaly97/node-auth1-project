const express = require('express')
const session = require('express-session')
const userRouter = require('../users/user-router')
const authRouter = require('../users/auth-router')

const server = express()

server.use(express.json())
//server.use('/api/users', userRouter)
//server.use('/api/auth', authRouter)

module.exports = server