// import http module
const http = require('http');

// import mongoose library
const mongoose = require('mongoose');

// import user model
const User = require('./models/user');

// define http port
const port = 3000;


// define database url
const mongoDB = 'mongodb://localhost:27017/safari';

// connect to the database
mongoose.connect(mongoDB, {useNewUrlParser: true});

// get  connection object
const db = mongoose.connection;

// listen to database connection errors and print them on console
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// helper function for collecting data in request body
const collectData = (request, callback) => {
    let data = '';
    request.on('data', (chunk) => {
        data += chunk;
    });
    request.on('end', () => {
        callback(JSON.parse(data));
    });
};


// this is http server
// it serves contents from the databases
http
    .createServer(function (req, res) {
        // setting up headers
        res.writeHead(200, {"Content-Type": "application/json", 'Access-Control-Allow-Origin': '*'});

        // users route
        if (req.url === '/api/v1/users' && req.method == 'GET') {
            console.log('we are here');
            User.find({ name: 'edgar'}, 'name email', function (err, docs) {
                console.log(docs);
                res.end(JSON.stringify(docs));
            });


        } else if (req.url === '/api/v1/user' && req.method == 'POST') {
            collectData(req, (data) => {

                let user = new User({name: data.name, email: data.email});
                user.save((err) => {
                    if (err) console.log(err);
                    res.end(JSON.stringify({message: 'user created'}));
                });

            })
        }

    })
    .listen(port, () => {
        console.log(`server is up: open localhost:${port}`);
    });
