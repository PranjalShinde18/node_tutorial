const mongoose = require('mongoose');

//Define URL for mongoDB connection

const mongoURL = 'mongodb://localhost:27017/Students';    //Use database name in place of 'test'.

mongoose.connect(mongoURL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
})

const db = mongoose.connection;

// Creating event listenersfor connected, disconnectd and error handlers

db.on('connected', function () {
    console.log('Connected to MongoDB server \n');
});

db.on('disconnected', function () {
    console.log('Disconnected from MongoDB');
});

db.on('error', function (err) {
    console.log('Error connecting to MongoDB:' + err);
});

// Export the database connection

module.exports = db;