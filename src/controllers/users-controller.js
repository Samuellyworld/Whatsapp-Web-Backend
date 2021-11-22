const Users = require('../model.js');

// post messages 
const handleUsers = (req,res) => {
    const dbUsers = req.body
    Users.create(dbUsers, (err, data) => {
        if(err) {
            res.status(500).json(err);
        } else {
            res.status(201).json(data)
        }
    })
}

module.exports = {
    handleUsers
}