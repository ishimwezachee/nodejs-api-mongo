const http = require('http');
const app = require('./app');
const db = require('./database');
db.customConnect('safari');

const port = 3000;
const message = `Server is running at http://localhost:${port}`;


module.exports = http.createServer(function (req, res) {
    app(req, res);
}).listen(port, () => console.log(message));