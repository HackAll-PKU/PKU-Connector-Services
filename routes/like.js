/**
 * Created by kouyuting on 2016/5/24.
 */
var express = require('express');
var router = express.Router();

var likeController = require("../controllers/LikeController.js");

/**
 *给说说tid点赞
 */
router.post('/api/v1/like/:tid',likeController.likeUser);

/**
 * 取赞说说
 */
router.delete('/api/v1/like/:tid', likeController.unlikeUser);

/**
 * 获取当前说说赞数
 */
router.get('/api/v1/like/:tid',likeController.getLikeCount);

module.exports = router;