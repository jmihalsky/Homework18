var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/homework18", { useNewUrlParser: true});

mongoose.connection.once("open",function(){
    console.log("Connection made");
}).on("error",function(error){
    console.log("Connection error: ", error);
});