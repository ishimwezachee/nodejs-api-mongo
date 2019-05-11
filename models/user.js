
// import mongoose library
const mongoose = require('mongoose');

// get mongoose Schema
const Schema = mongoose.Schema;

// create user schema
UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String }
    }
);


// export user model
module.exports = mongoose.model('User', UserSchema);