
const Messages = require('model.js');

// post messages 

const handlePostMessages = (req,res) => {
    const dbMessage = req.body
    Messages.create(dbMessage, (err, data) => {
        if(err) {
            res.status(500).json(err);
        } else {
            res.status(201).json(data)
        }
    })
}


// get messages sync

const handleGetMessages = (req,res) => {
    Messages.find((err, data) => {
        if(err) {
            res.status(500).json(err)
        } else {
            res.status(200).json(data)
        }
    })
}

module.exports = {
    handleGetMessages,
    handlePostMessages
}