var express = require('express');
var router = express.Router();

var reviews = require("../public/data/reviews.json");

router.get('/', function(req, res, next) {
  res.send({
    status : true,
    respuesta : reviews
  });
});


module.exports = router;
