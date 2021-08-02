let express = require("express");


let Categoria = require("../controllers/categoria");
 
let api = express.Router();
 

api.post("/categoria/registrarCategoria", Categoria.registrarCategoria);
api.get("/categoria/:id", Categoria.buscarCategoria);
api.get("/categoria/:nombre?", Categoria.listaCategoria);
api.post("/categoria/:nombre?", Categoria.listaCategoria);
api.put("/categoria/editarCategoria/:id", Categoria.editarCategoria);
api.delete("/categoria/eliminarCategoria/:id", Categoria.eliminarCategoria);

module.exports = api;


