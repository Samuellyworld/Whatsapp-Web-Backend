const messages = require('./src/controllers');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Pusher =  require('pusher');
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

//  connecting to pusher middleware
const pusher = new Pusher({
    appId: "1293648",
    key: "a01164abd7f41e43817a",
    secret: "693a2fa75222bbe1ca31",
    cluster: "us3",
    useTLS: true
  });

//   connecting to real time
const db = mongoose.connection
  db.once("open", () => {
      console.log("connecting to real time")
      const msgCollection = db.collection('whatsapp-datas')
      const changeStream = msgCollection.watch();
      changeStream.on('change', (change) => {
          console.log("A change occurred", change)
          if(change.operationType === 'insert') {
              const messageDetails = change.fullDocument;
              pusher.trigger('messages', 'inserted', {
                  name : messageDetails.user,
                  message : messageDetails.message
              })
          }
      })
  })

// routes
app.get('/', (req,res) => {
    res.status(200).json('whatsapp clone is starting')
})

// post messages
app.post('/messages/new', (req,res) => {messages.handlePostMessages(req,res)});

// get messages
app.get('/messages/sync', (req,res) => {messages.handleGetMessages(req,res)});

// listening to server
app.listen(port, () => {
    console.log(`app is working on port ${port}`);
})