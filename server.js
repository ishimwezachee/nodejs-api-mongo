const http = require('http');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
  }
);

const NationalParkParkSchema = new Schema(
  {
    name: { type: String, min: 5, max: 100 },
    address: { type: String, min: 5, max: 200 }
  }
);

const User = mongoose.model('User', UserSchema);
const NationalPark = mongoose.model('NationalPark', NationalParkParkSchema);


const mongoDBUrl = 'mongodb://localhost:27017/safari'

// connect with mongoDB
mongoose.connect(mongoDBUrl, { useNewUrlParser: true });

const port = 3000;
const message = `Server listens at http://localhost:${port}`;

http
  .createServer((req, res) => {
    // setting up headers
    res.writeHead(200, { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' });

    // users route
    if (req.url === '/api/v1/users' && req.method == 'GET') {
      // gets data from the database
      User.find({}, 'name email', (err, results) => {
        if (err) {
          console.log(err);
        }

        res.end(JSON.stringify(results));
      });
    }

    // creates national parks
    else if (req.url === '/api/v1/national-park' && req.method == 'POST') {
      let data = '';
      req.on('data', (chunk) => {
        data += chunk;
      });
      req.on('end', () => {
        const dataJson = JSON.parse(data);
        const nationalpark = new NationalPark(
          {
            name: dataJson.name,
            address: dataJson.address
          }
        );

        nationalpark.save((err) => {
          if (err) console.log(err);
          res.end(JSON.stringify({ message: 'its okay' }))
        });

      });

    }

    // gets all national parks
    else if (req.url === '/api/v1/national-parks' && req.method == 'GET') {
      // get the national parks from the database
      NationalPark.find({}, 'name address', (err, results) => {
        if (err) {
          console.log(err);
        }

        res.end(JSON.stringify(results));
      });

    }
    else if (req.url === '/') {
      res.end(' You are home');
    }
    else {
      res.end('not found');
    }
  })
  .listen(port, () => console.log(message));