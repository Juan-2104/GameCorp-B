let jwt = require("jwt-simple");

let moment = require("moment");
let secret = "bit21store";


exports.createToken =  (usuario) => {
    let payload = {
      _id: usuario._id,
      correo: usuario.correo,
      iat: moment().unix(),
      
    };

  
    return jwt.encode(payload, secret);
};
