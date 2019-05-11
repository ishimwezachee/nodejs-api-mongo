const mongoose = require('mongoose');


exports.customConnect = (dbName) => {

// define database url
    const mongoDB = `mongodb://localhost:27017/${dbName}`;

// connect to the database
    mongoose.connect(mongoDB, {useNewUrlParser: true});

// get  connection object
    const db = mongoose.connection;

// listen to database connection errors and print them on console
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}