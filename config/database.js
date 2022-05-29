
/**
 * Esta variable carga todo la funcionalidad de mongoose
 */
const mongoose = require("mongoose");
/**
 * esta variable almacena la ruta de conexion a la base datos de mongo
 */
const  MONGO_URI  = 'mongodb://localhost:27017/bingo';

/**
 * exporta el funcionalidad y conexion
 */
exports.connect = () => {
  
  
  mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Conectado'))
  .catch(err => console.log(err));
};