
let mongoose = require("mongoose");

let Schema = mongoose.Schema;
 

let categoriaSchema = Schema({
  nombre: String,
  
});

module.exports = mongoose.model("categoria", categoriaSchema);

