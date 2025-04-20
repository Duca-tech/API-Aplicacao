const express = require('express');
var router = express.Router();
var cepController = require('../controller/cepController')



router.post("/BuscarDados",cepController.buscarDados)



module.exports = router
