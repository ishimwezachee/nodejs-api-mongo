
const controller = require('./controller');

exports.activate = (req, res) => {
    // users route
    if (req.url === '/api/v1/users' && req.method == 'GET') {
        controller.getUsers(req, res);

    } else if (req.url === '/api/v1/user' && req.method == 'POST') {
        controller.createUser(req, res);
    }
}