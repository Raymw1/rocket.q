const express = require("express");
const route = express.Router();
const questionController = require("./controllers/questionController");

route.get("/", function(req, res) {
    return res.render("home");  // Render ejs
});


route.get("/create-pass", function(req, res) {
    return res.render("create-pass");
});

route.get("/room", function(req, res) {
    return res.render("room");
});

route.post(`/room/:room/:question/:action`, questionController.index);

module.exports = route;