let jwt = require("jwt-simple");
// Importamos libreria para fechas
let moment = require("moment");
const { use } = require("../routes/user");
// Clave secreta
let secret = "mondongo";

// Exportamos el token generado enviando los datos del usuario
exports.createToken =  (user) => {
  let payload = {
    _id: user._id,
    name: user.name,
    lastName: user.lastName,
    dateBirth: user.dateBirth,
    mail: user.mail,
    nick:user.nick,
    number: user.number,

    iat: moment().unix(),
    //exp: moment.add(10, "days").unix(),
  };
  // se retorna el token codificado
  return jwt.encode(payload, secret);
};
