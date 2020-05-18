const router = require('express').Router()
const Users = require('./user-model')

function restricted(req, res, next) {
    if (req.session && req.session.loggedIn) {
      next();
    } else {
      res.status(401).json({ you: "cannot pass!" });
    }
  }

router.use(restricted)

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

module.exports = router