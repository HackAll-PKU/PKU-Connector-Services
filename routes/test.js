/**
 * Created by ChenLetian on 16/5/1.
 */
var express = require('express');
var router = express.Router();

/**
 *  for test
 *  feel free to test some developing function
 */
var authenticationController = require("../controllers/AuthenticationController.js");
router.post('/test', authenticationController.authenticateUser);

module.exports = router;
