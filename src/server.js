const express = require("express");
const server = express();
const route = require("./route");
const path = require("path");

server.use(express.static("public"));
server.set('view engine', "ejs", ).set("views", path.join(__dirname, "/views/"));   // Usin ejs and setting the views path
server.use(route);

const PORT = process.env.PORT||"3000";
server.listen(PORT, function() {
    console.log(`Go to: http://127.0.0.1:${PORT}/`);
})

