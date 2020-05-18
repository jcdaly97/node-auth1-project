const bcrypt = require('bcryptjs')
const router = require('express').Router()

const Users = require('./user-model')

router.post('/reqister', (req,res) =>{
    const userCreds = req.body
    //set number of rounds the hashing will happen
    const rounds = 8
    //creat the hash
    const hash = bcrypt.hashSync(userCreds.password, rounds)
    //set the password to that hash
    userCreds.password = hash
    //save the user
    Users.addUser(userCreds)
        .then(user=>{
            res.status(201).json(user)
        })
        .catch(err=>{
            res.status(500).json({
                message: 'unable to save user',
                error: err
            })
        })
})

/*router.post('/login', (req,res)=>{
    const userCreds = req.body

    Users.getUsersBy({username: userCreds.username})
        .then(([user])=>{
            if(user && bcrypt.compareSync(userCreds.password, user.password)){
                res.status(200).json()
            }
        })
})*/