
const User = require('../models/user');

exports.index = (req, res) => {
    // gets data from the database
    User.find({}, 'name email', (err, results) => {
        if (err) {
            console.log(err);
        }

        res.end(JSON.stringify(results));
    });
}