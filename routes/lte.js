var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const paginate = require('express-paginate');

router.get('/lte_index', function(req, res, next) {
  res.render('lte/lte_index');
  
  });


module.exports = router;
