/**
 * Created by HuShunxin on 16/5/8.
 */
var express = require('express');
var router = express.Router();

var commentController = require("../controllers/CommentController.js");

/**
 * 发表新评论
 */
router.post('/api/v1/comment', commentController.postNewComment);

/**
 * 获取评论
 */
router.get('/api/v1/comment/:cid', commentController.getComment);

/**
 * 删除评论(同时删除子评论)
 */
router.delete('/api/v1/comment/:cid' ,commentController.deleteComment);

/**
 * 获取talking下的cid list
 */
router.get('/api/v1/comment/t/:tid', commentController.getCommentListOfTalking);

module.exports = router;
