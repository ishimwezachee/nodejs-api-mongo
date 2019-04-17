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
    .createServer(function(req, res) {
      // setting up headers
      res.writeHead(200, { "Content-Type": "application/json" , 'Access-Control-Allow-Origin': '*'});
      dbo.collection('nationalParks').find({}).toArray(function(err, results) {
        res.end(JSON.stringify(results));
      });
    })
    .listen(8080, () => {
      console.log("server is up: open localhost:8080");
    });
});
