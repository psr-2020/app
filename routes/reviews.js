var express = require('express');
var router = express.Router();

var reviews = require("../public/data/reviews.json");

router.get('/', function(req, res, next) {
  res.send({
    status : true,
    respuesta : reviews
  });
});

router.put('/:accion/:id', function(req, res, next) {

  var idBuscado = parseInt(req.params.id, 10);
  var accion = req.params.accion;

  if(accion == "like") reviews[idBuscado].likes++;
  else reviews[idBuscado].dislikes++;

  res.send({
    status : true
  });
});


module.exports = router;
