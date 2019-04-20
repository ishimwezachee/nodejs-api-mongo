var http = require("http");
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

// mongo client for interacting with the
// mongo database
MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  let dbo = db.db("safari");

  // this is http server
  // it serves contents from the databases
  http
    .createServer(function (req, res) {
      // setting up headers
      res.writeHead(200, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' });

      // users route
      if (req.url === '/api/v1/users') {
        // gets data from the database
        dbo.collection('users').find({}).toArray(function (err, users) {
          // returning users as our response
          res.end(JSON.stringify(users));
        });
      }

      // national parks 
      else if (req.url === '/api/v1/national-parks') {
        // get the national parks from the database
        dbo.collection('nationalParks').find({}).toArray(function (err, nationalparks) {
          // returning national parks  as our response
          res.end(JSON.stringify(nationalparks));
        });
      }
      else if (req.url === '/') {
        res.end(' You are home');
      }
      else {
        res.end('not found');
      }
    })
    .listen(8080, () => {
      console.log("server is up: open localhost:8080");
    });
});
