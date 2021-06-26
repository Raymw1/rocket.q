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
route.post("/create-pass", roomController.create);

route.get("/room/:room", roomController.open);
route.post("/enterroom", roomController.enter);

route.post(`/question/create/:room`, questionController.create)
route.post(`/question/:room/:question/:action`, questionController.index);

module.exports = route;