const http = require('http');
const database = require('./database');
const usersController = require('./controller/users-controller');
const nationalParksController = require('./controller/national-parks-controller');

const port = 3000;
const message = `Server listens at http://localhost:${port}`;

database('safari');



http
  .createServer((req, res) => {
    // setting up headers
    res.writeHead(200, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' });

    // users route
    if (req.url === '/api/v1/users' && req.method == 'GET') usersController.index(req, res);

    // creates national parks
    else if (req.url === '/api/v1/national-park' && req.method == 'POST') nationalParksController.create(req, res);

    // gets all national parks
    else if (req.url === '/api/v1/national-parks' && req.method == 'GET') nationalParksController.index(req, res);
    else if (req.url === '/') res.end(' You are home');
    else res.end('not found');
  })
  .listen(port, () => console.log(message));