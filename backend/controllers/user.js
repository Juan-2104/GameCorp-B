let User=require("../models/user");
let bcrypt=require("bcrypt-nodejs");
let jwt = require("../libs/jwt");


const userRegister=(req,res)=>{
    let params=req.body;
   

    let user=new User();

    if (
        params.name &&
        params.lastName &&
        params.pass &&
        params.dateBirth &&
        params.mail &&
        params.nick &&
        params.number &&
        params.rol 
    ) {
        bcrypt.hash(params.pass,null,null,(err,hash)=>{
            if (hash) {
                user.name =params.name;
                user.lastName =params.lastName;
                user.pass =hash;
                user.dateBirth =params.dateBirth;
                user.mail =params.mail;
                user.nick =params.nick;
                user.number =params.number;
                user.rol =params.rol;

                user.save((err,saveUser)=>{
                    if (err) {
                        res.status(501).send({err: "User not registered"})
                    } else {
                        res.status(200).send({user:saveUser});
                    }
                });
            }else{
                res.status(405).send({err:"Data was not saved"});
            }
        });
    } 
};

const login=(req,res)=>{
    let params=req.body;
    console.log("paramas linea 45",params);
    User.findOne({mail:params.mail},(err,userData)=>{
        if (err) {
            res.status(500).send({message:"Server error"});
        } else {
            if (userData) {
                console.log("userData linea 51",userData);
                bcrypt.compare(params.pass, userData.pass,(err,confirm)=>{
                    console.log("confirm linea 53",confirm);
                    if(err){
                        console.log(err);
                    }
                    if (confirm) {
                        console.log("confirmacion linea 54",confirm);
                        if (params.getToken) {
                            
                            res.status(200).send({

                                jwt:jwt.createToken(userData),
                                user:userData,
                                
                            })
                            
                            console.log("token 61");
                        } else {
                            res
                                .status(200)
                                .send({User:userData,message:"Without token"});
                        }
                    } else {
                        res.status(401).send({message:"Wrong password or email. Please check and try again erro1"});
                    }
                })
            } else {
                res.status(401).send({message:"Wrong password or email. Please check and try again."});
            }
        }
    })
}

module.exports={
    userRegister,
    login,
    
};