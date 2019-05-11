
const User = require('./models/user');

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

// gets all users from the database
exports.getUsers = (req, res) => {
    console.log('we are here');
    User.find({}, 'name email', function (err, docs) {
        console.log(docs);
        res.end(JSON.stringify(docs));
    });
};


// creates a new user
exports.createUser = (req, res) => {
    collectData(req, (data) => {

        let user = new User({name: data.name, email: data.email});
        user.save((err) => {
            if (err) console.log(err);
            res.end(JSON.stringify({message: 'user created'}));
        });

    });

}