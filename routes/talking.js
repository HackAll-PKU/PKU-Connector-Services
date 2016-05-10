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
 * 获取该用户的新说说
 */
router.get('/api/v1/talkings/:uid', talkingController.getMyTalkings);

/**
 * 删除说说(同时删除说说的评论)
 */
router.delete('/api/v1/talking/:tid' ,talkingController.deleteTalking);

module.exports = router;