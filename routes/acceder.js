var express = require('express');
var router = express.Router();

var cuentas = require("../public/data/accounts.json");

router.get('/', function(req, res, next) {
  res.send({
    status : true,
    response : cuentas
  });
});



module.exports = router;
