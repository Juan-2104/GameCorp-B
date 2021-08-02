let Categoria = require("../models/categoria");

const registrarCategoria = (req, res) => {
    
    let params = req.body;
   
    let categoria = new Categoria();
 
    categoria.nombre = params.nombre;
   
   
    categoria.save((err, saveCategoria) => {
  
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (saveCategoria) {
          res.status(200).send({ categoria: saveCategoria });
        } else {
          res.status(401).send({ mensaje: "No se pudo registrar la categoria" });
        }
      }
    });
  };
  const buscarCategoria = (req, res) => {
    
    let id = req.params["id"];
    
    Categoria.findById({ _id: id }, (err, datosCategoria) => {
    
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (datosCategoria) {
          res.status(200).send({ categoria: datosCategoria });
        } else {
          res.status(401).send({ mensaje: "La categoria no existe" });
        }
    }
  });
};
const listaCategoria = (req, res) => {
    // si tenemos filtro nombre lo guardamos
    let nombre = req.params["nombre"];
    // Busqueda de las categorias
    Categoria.find({ nombre: new RegExp(nombre, "i") }, (err, datosCategoria) => {
      // si hay error al conectar con mongo
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (datosCategoria) {
          res.status(200).send({ categoria: datosCategoria });
        } else {
          res.status(401).send({ mensaje: "No hay categorias" });
        }
      }
    });
  };
  const editarCategoria = (req, res) => {
  
    let id = req.params["id"];
   
    let params = req.body;
  
    Categoria.findByIdAndUpdate(
      { _id: id },
      { nombre: params.nombre, descripcion: params.descripcion },
      (err, datosCategoria) => {
        if (err) {
          res.status(500).send({ message: "Error en el servidor" });
        } else {
          if (datosCategoria) {
            res.status(200).send({ categoria: datosCategoria });
          } else {
            res
              .status(403)
              .send({ message: "La categoria no se pudo actualizar" });
          }
        }
      }
    );
  };

  const eliminarCategoria = (req, res) => {
    
    let id = req.params["id"];
    
    Categoria.findByIdAndRemove({ _id: id }, (err, datosCategoria) => {
      if (err) {
        res.status(500).send({ message: "Error en el servidor" });
      } else {
        if (datosCategoria) {
          res.status(200).send({ categoria: datosCategoria });
        } else {
          res.status(403).send({ message: "La categoria no se pudo eliminar" });
        }
      }
    });
  };
  
  
  
module.exports = {
    registrarCategoria,
    buscarCategoria,
    listaCategoria,
    editarCategoria,
    eliminarCategoria,
  };
  