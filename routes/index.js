/**
 * Created by ChenLetian on 16/4/25.
 */
var express = require('express');
var router = express.Router();

var indexController = require("../controllers/IndexController");
/**
 *  GET home page.
 */
router.get('/', indexController.indexPage);

module.exports = router;
