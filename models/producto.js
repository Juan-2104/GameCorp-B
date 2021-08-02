
let mongoose = require("mongoose");

let Schema = mongoose.Schema;
 

let productoSchema = Schema({
  nombre: String,
  precio:Number,
  descripcion:String,
  imagen:String,
  cantidad:Number,
  idCategoria: { type: Schema.ObjectId, ref: "categoria" },
});

module.exports = mongoose.model("producto", productoSchema);

