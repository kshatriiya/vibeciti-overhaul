var express = require("express");
var app = express();


app.set("views", "./app_server/views");
app.set("view engine", "ejs");
app.use(express.static("./public"));


app.get("/", function(req, res) {

	res.render("home");
})

app.listen(3000, "localhost");

