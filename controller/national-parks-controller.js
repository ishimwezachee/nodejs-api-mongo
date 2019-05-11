
const NationalPark = require('../models/national-park');

exports.create = (req, res) => {

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


exports.index = (req, res) => {
    // get the national parks from the database
    NationalPark.find({}, 'name address', (err, results) => {
        if (err) {
            console.log(err);
        }

        res.end(JSON.stringify(results));
    });
}