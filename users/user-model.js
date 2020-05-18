const db = require('../data/dbConnect')

module.exports = {
    addUser,
    getUsers,
    getUsersBy,
    //getByID
}

function getUsers(){
    return db('users').select('id', 'username')
}

function getUsersBy(param){
    return db('users').where(param)
}

async function addUser(user){
    try{
        const [newID] = await db('users').insert(user)
        return getUsersBy({id: newID})
    }catch(err){
        throw err
    }
}