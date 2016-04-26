var express = require('express');
var router = express.Router();

/* GET home page. */
var indexController = require("../controllers/IndexController");
router.get('/', indexController.indexPage);

module.exports = router;
