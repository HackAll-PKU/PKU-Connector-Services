/**
 * Created by ChenLetian on 16/6/26.
 */
var express = require('express');
var router = express.Router();

var userController = require("../controllers/UserController.js");
/**
 * 搜索用户
 */
router.get('/api/v1/search/users/:searchwords', userController.searchUser);

module.exports = router;
