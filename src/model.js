const mongoose = require('mongoose');

const whatsappSchema = mongoose.Schema({
    users : {
     timeStamp : String,
     received : Boolean,
     room : {
         message : Array,
         roomName: Array,
     }
     additionalData : Array,
    }
    

})

module.exports = mongoose.model('whatsapp-datas', whatsappSchema)