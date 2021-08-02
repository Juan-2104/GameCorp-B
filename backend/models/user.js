let  mongoose  = require("mongoose");

let Schema=mongoose.Schema;


let userSchema=Schema({
    name: String,
    lastName: String,
    pass:String,
    dateBirth: String,
    mail: String,
    nick:String,
    number: Number,
    rol:String,
    registerDate:{ type: Date, default: Date.now },

});

module.exports=mongoose.model("user",userSchema);