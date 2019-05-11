const routes = require('./routes')


module.exports = (req, res) => {
    // setting up headers
    res.writeHead(200, {"Content-Type": "application/json", 'Access-Control-Allow-Origin': '*'});
    routes.activate(req, res);
}




