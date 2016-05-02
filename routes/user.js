/**
 * Created by ChenLetian on 16/5/2.
 */
var express = require('express');
var router = express.Router();

var userController = require("../controllers/UserController.js");
/**
 * 新建用户
 */
router.post('/api/v1/user', userController.addNewUser);

module.exports = router;
