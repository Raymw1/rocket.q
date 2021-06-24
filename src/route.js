const express = require("express");
const route = express.Router();
const questionController = require("./controllers/questionController");
const roomController = require("./controllers/roomController");

route.get("/", function(req, res) {
    return res.render("index", {page: "home"});  // Render ejs
});


route.get("/create-pass", function(req, res) {
    return res.render("index", {page: "create-pass"});
});

route.get("/room/:room", function(req, res) {
    return res.render("room");
});

route.post(`/question/:room/:question/:action`, questionController.index);
route.post("/create-pass", roomController.create);

module.exports = route;