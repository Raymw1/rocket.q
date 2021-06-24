const express = require("express");
const route = express.Router();

route.get("/", function(req, res) {
    return res.render("home");  // Render ejs
});


route.get("/create-pass", function(req, res) {
    return res.render("create-pass");
});

route.get("/room", function(req, res) {
    return res.render("room");
});

module.exports = route;