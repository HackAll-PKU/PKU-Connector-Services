/**
 * Created by ChenLetian on 16/5/3.
 */
var express = require('express');
var router = express.Router();

var authenticationController = require("../controllers/AuthenticationController.js");
/**
 * 认证用户,颁发token
 */
router.post('/api/v1/authentication', authenticationController.authenticateUser);

/**
 * 验证token,解析uid和uname
 */
router.use(authenticationController.verifyToken);

module.exports = router;