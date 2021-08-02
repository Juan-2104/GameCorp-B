let express= require("express");
let bodyParser= require("body-parser");
let mongoose=require("mongoose");

let port=process.env.PORT || 3001;


let app=express();

let userRoutes=require("./routes/user");

mongoose.connect(
    "mongodb://localhost:27017/gcdb",
    { useUnifiedTopology:true, useNewUrlParser:true },
    (err,res)=>{
        if (err) {
            throw err;
        } else {
            console.log("Servidor DB: Running");
            app.listen(port,function(){
                console.log("Backend server running on port: "+port);
            });
        }
    }
);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use("/api",userRoutes);

module.exports=app;