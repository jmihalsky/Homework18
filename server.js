var express = require("express");
var mongojs = require("mongojs");

var PORT = process.env.PORT || 3000;
var app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.listen(PORT, function(){
    console.log("listening on port: http://localhost:" + PORT);
});