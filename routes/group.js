/**
 * Created by ChenLetian on 16/5/14.
 */
var express = require('express');
var router = express.Router();

var groupController = require("../controllers/GroupController.js");
/**
 * 新建组
 */
router.post('/api/v1/group', groupController.addNewGroup);

/**
 * 查询组详细信息
 */
router.get('/api/v1/group/:gid', groupController.getGroupInfo);

/**
 * 更新组信息
 */
router.put('/api/v1/group/:gid', groupController.modifyGroupInfo);

/**
 * 根据组名建议组名
 */
router.get('/api/v1/group/suggest/name/:gname', groupController.suggestGroupname);

module.exports = router;
