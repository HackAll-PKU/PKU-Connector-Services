/**
 * Created by ChenLetian on 16/5/14.
 */
var express = require('express');
var router = express.Router();

var groupController = require("../controllers/GroupController.js");
/**
 * 新建用户
 */
router.post('/api/v1/group', groupController.addNewGroup);

/**
 * 查询用户详细信息
 */
router.get('/api/v1/group/:gid', groupController.getGroupInfo);

/**
 * 更新用户信息(除了密码之外的属性都能够更改)
 */
router.put('/api/v1/group/:gid' , groupController.modifyGroupInfo);

module.exports = router;
