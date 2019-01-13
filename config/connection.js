var mongoose = require("mongoose");

var CONNECTION_URI = process.env.MONGODB_URI || "mongodb://localhost/homework18"

mongoose.connect(CONNECTION_URI, { useNewUrlParser: true});

mongoose.connection.once("open",function(){
    console.log("Connection made");
}).on("error",function(error){
    console.log("Connection error: ", error);
});