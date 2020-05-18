const router = require('express').Router()
const Users = require('./user-model')

router.get('/', (req,res)=>{
    Users.getUsers()
        .then(users=>{
            res.json(users)
        })
        .catch(err=>{
            res.json({
                message: 'error retrieving data',
                error: err
            })
        })
})