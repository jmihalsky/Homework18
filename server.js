var express = require("express");

var mdb = require("./config/connection");

var PORT = process.env.PORT || 3000;
var app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

var routes = require("./routes/scrape_route.js");

app.use(routes);

app.listen(PORT, function(){
    console.log("listening on port: http://localhost:" + PORT);
});