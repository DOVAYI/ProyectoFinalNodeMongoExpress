const mongoose = require("mongoose");

const  MONGO_URI  = 'mongodb://localhost:27017/bingo';

exports.connect = () => {
  // Connecting to the database
  
  mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Conectado'))
  .catch(err => console.log(err));
};