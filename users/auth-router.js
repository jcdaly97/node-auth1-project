const bcrypt = require('bcryptjs')
const router = require('express').Router()

const Users = require('./user-model')

router.post('/register', (req,res) =>{
    const userCreds = req.body

    //set number of rounds the hashing will happen
    const rounds = 2
    //creat the hash
    const hash = bcrypt.hashSync(userCreds.password, rounds)
    //set the password to that hash
    userCreds.password = hash
    //save the user
    Users.addUser(userCreds)
        .then(user=>{
            //add a logged in bool to the session
            req.session.loggedIn = true
            res.status(201).json(user)
        })
        .catch(err=>{
            res.status(500).json({
                message: 'unable to save user',
                error: err
            })
        })
})

router.post('/login', (req,res)=>{
    const userCreds = req.body

    Users.getUsersBy({username: userCreds.username})
        .then(([user])=>{
            if(user && bcrypt.compareSync(userCreds.password, user.password)){
                req.session.loggedIn = true
                res.status(200).json({
                    message: 'logged in!'
                })
            }else{
                res.status(401).json({ message: "Invalid credentials" })
            }
        })
        .catch(err=>{
            res.status(500).json({
                message: 'trouble logging in'
            })
        })
})

module.exports = router