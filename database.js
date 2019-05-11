const mongoose = require('mongoose');

module.exports = (dbName) => {
    const mongoDBUrl = `mongodb://localhost:27017/${dbName}`
// connect with mongoDB
mongoose.connect(mongoDBUrl, { useNewUrlParser: true });

};