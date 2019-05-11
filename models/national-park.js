
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NationalParkParkSchema = new Schema(
    {
      name: { type: String, min: 5, max: 100 },
      address: { type: String, min: 5, max: 200 }
    }
  );
  
module.exports = mongoose.model('NationalPark', NationalParkParkSchema);
  