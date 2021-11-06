
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3001

// configuring database
const connectionString = 'mongodb+srv://admin:u9ITnnKhgh4yAx28@cluster0.bqq94.mongodb.net/whatsappdb?retryWrites=true&w=majority'

// connecting to database
mongoose.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true
},  (err) => {
    if(err) {
        console.log(err)
    } else {
        console.log("Database sucessfully connected");
    }
} )

// middleware
app.use(express.json());

// routes
app.get('/', (req,res) => {
    res.status(200).json('whatsapp clone is starting')
})

// listening to server
app.listen(port, () => {
    console.log(`app is working on port ${port}`);
})