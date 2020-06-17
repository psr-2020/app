var express = require('express');
var router = express.Router();

var games = require("../public/data/games.json");

router.get('/', function(req, res, next) {
  res.send({
    status : true,
    respuesta : games
  });
});

module.exports = router;
