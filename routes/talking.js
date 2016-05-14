/**
 * Created by Kou Yuting on 2016/5/10.
 */
var express = require('express');
var router = express.Router();

var talkingController = require("../controllers/TalkingController.js");

/**
 * 发表新说说
 */
router.post('/api/v1/talking', talkingController.postNewTalking);

/**
 * 获取说说
 */
router.get('/api/v1/talking/:tid' ,talkingController.getTalkingInfo);

/**
 * 获取该用户的说说
 */
router.get('/api/v1/talkings/u/:uid', talkingController.getTalkingsOfUser);

/**
 * 获取该用户组的说说
 */
router.get('/api/v1/talkings/g/:gid', talkingController.getTalkingsOfGroup);

/**
 * 获取当前登录用户所有关注人以及group的新说说个数
 */
router.get('/api/v1/talkings/new', talkingController.getNewFollowedTalkingsCount);

/**
 * 获取当前登录用户所有关注人以及group的说说
 */
router.get('/api/v1/talkings', talkingController.getFollowedTalkings);

/**
 * 删除说说(同时删除说说的评论)
 */
router.delete('/api/v1/talking/:tid' ,talkingController.deleteTalking);

module.exports = router;