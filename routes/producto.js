let express = require("express");

let Producto = require("../controllers/producto");
 
let multipart = require("connect-multiparty");
let path = multipart({ cargas: "./uploads/imgProducto" });
let api = express.Router();
 


api.post("/producto/registrarProducto", path, Producto.registrarProducto);
api.get("/producto/:nombre?", Producto.listaProducto);
api.get("/producto/obtenerProducto/:id", Producto.obtenerProducto);
api.put("/producto/editarProducto/:id", path, Producto.editarProducto);
api.delete("/producto/:id", Producto.eliminarProducto);

module.exports = api;
