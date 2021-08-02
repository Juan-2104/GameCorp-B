let Producto = require("../models/producto");
// Importamos modulo file System
let fs = require("fs");
// Importamos modulo path para manejar las rutas de los ficheros en el proyecto
let path = require("path");
// Importamos libreria para fechas
let moment = require("moment");

const registrarProducto = (req, res) => {
  console.log("0", req);
  // Obtenemos datos del JSON
  let params = req.body;
  // Instanciamos el producto Modelo
  let producto = new Producto();
  //Validamos los campos
  if (
    params.nombre &&
    params.descripcion&&
   
    params.precio &&
    params.cantidad&&
    params.idCategoria 

  ) {
    // Ruta donde quedara la imagen en el proyecto
    let imagenPath = req.files.imagen.path;
    // Generamos un codigo para las imagenes
    let nameImg = moment().unix();
    // creamos variable de la nueva ruta
    var rutaServer =
      "./uploads/imgProducto/" + nameImg + path.extname(imagenPath).toLowerCase();
    // copiamos la imagen a la nueva ruta
    fs.createReadStream(imagenPath).pipe(fs.createWriteStream(rutaServer));
    // Nombre del archivo que quedara en BD
    let bdImg = nameImg + path.extname(imagenPath).toLowerCase();
    // llenamos el modelo con los datos del req
    producto.nombre = params.nombre;
    producto.descripcion=params.descripcion;
    producto.imagen = bdImg;
   
    producto.precio = params.precio;

    producto.cantidad=params.cantidad;
    producto.idCategoria = params.idCategoria;
   
    // Registramos el producto
    producto.save((err, datosProducto) => {
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (datosProducto) {
          res.status(200).send({ producto: datosProducto });
        } else {
          res.status(401).send({ mensaje: "No se pudo registrar el producto" });
        }
      }
    });
  } else {
    res.status(401).send({ mensaje: "Falto alguno de los campos" });
  }
};



// Consultamos todas las categorias
const listaProducto = (req, res) => {
  // si tenemos filtro nombre lo guardamos
  let nombre = req.params["nombre"];
  // Busqueda de las categorias
  Producto.find({ nombre: new RegExp(nombre, "i") })
    .populate("idCategoria")
    .exec((err, datosProducto) => {
      if (err) {
        res.status(500).send({ message: "Error en el servidor" });
      } else {
        if (datosProducto) {
          res.status(200).send({ productos: datosProducto });
        } else {
          res
            .status(403)
            .send({ message: "No hay ningun producto con ese nombre" });
        }
      }
    });
};

// Obtener Producto

const obtenerProducto = (req, res) => {
  console.log(req);
  let id = req.params["id"];

  Producto.findOne({ _id: id }, (err, datosProducto) => {
    if (err) {
      res.status(500).send({ message: "Error en el servidor" });
    } else {
      if (datosProducto) {
        res.status(200).send({ producto: datosProducto });
      } else {
        res.status(403).send({ message: "No existe el producto" });
      }
    }
  });
};

// Editar producto

const editarProducto = (req, res) => {
  let params = req.body;
  let id = req.params["id"];
  let img = req.params["img"];

  if (
    params.nombre &&
    params.descripcion&&
   
    params.precio &&
    params.cantidad&&
    params.idCategoria 

  ) {
    if (img || img != null || img != undefined) {
      fs.unlink("./uploads/imgProducto/" + img, (err) => {
        if (err) throw err;
      });
    }

    // Ruta donde quedara la imagen en el proyecto
    let imagenPath = req.files.imagen.path;
    // Generamos un codigo para las imagenes
    let nameImg = moment().unix();
    // creamos variable de la nueva ruta
    var rutaServer =
      "./uploads/imgProducto/" + nameImg + path.extname(imagenPath);
    // copiamos la imagen a la nueva ruta
    fs.createReadStream(imagenPath).pipe(fs.createWriteStream(rutaServer));
    // Nombre del archivo que quedara en BD
    let bdImg = nameImg + path.extname(imagenPath);
    console.log(params);
    console.log(id);
    console.log(img);
    console.log(bdImg);
    Producto.findByIdAndUpdate(
      { _id: id },
      {
        nombre: params.nombre,
        descripcion:params.descripcion,
        imagen: bdImg,
       
        precio: params.precio,
        cantidad:params.cantidad,
        idCategoria: params.idCategoria,
       
      },
      (err, datosProducto) => {
        console.log(datosProducto)
        if (err) {
          res.status(500).send({ message: "Error en el servidor" });
        } else {
          if (datosProducto) {
            res.status(200).send({ producto: datosProducto });
          } else {
            res.status(403).send({ message: "No se edito el producto" });
          }
        }
      }
    );
  } else {
    res.status(401).send({ mensaje: "Falto alguno de los campos" });
  }
};

// Eliminamos producto
const eliminarProducto = (req, res) => {
  let id = req.params["id"];

  Producto.findOneAndRemove({ _id: id }, (err, datosProducto) => {
    if (err) {
      res.status(500).send({ message: "Error en el servidor" });
    } else {
      if (datosProducto) {
        fs.unlink("./uploads/imgProducto/" + datosProducto.imagen, (err) => {
          if (err) throw err;
        });
        res.status(200).send({ produto: datosProducto });
      } else {
        res.status(403).send({ message: "No se elimino ningun registro" });
      }
    }
  });
};

// Exportamos el modulo con sus funciones
module.exports = {
  registrarProducto,
  listaProducto,
  obtenerProducto,
  editarProducto,
  eliminarProducto,
};