const mongoose = require('mongoose');

const whatsappSchema = mongoose.Schema({
    message : String,
    name : String,
    timeStamp : String,
    received : Boolean
})

module.exports = mongoose.model('whatsapp-data', whatsappSchema)