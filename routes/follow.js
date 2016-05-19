/**
 * Created by HuShunxin on 16/5/12.
 */
var express = require('express');
var router = express.Router();

var followController = require("../controllers/FollowController.js");

/**
 * 关注uid
 */
router.post('/api/v1/follow/user/:uid', followController.followUser);

/**
 * 关注gid
 */
router.post('/api/v1/follow/group/:gid', followController.followGroup);

/**
 * 取关uid
 */
router.delete('/api/v1/follow/user/:uid', followController.unfollowUser);

/**
 * 取关gid
 */
router.delete('/api/v1/follow/group/:gid', followController.unfollowGroup);

/**
 * 获取用户关系状态(0:无关系, 1:已关注, 2:被关注, 3:互相关注)
 */
router.get('/api/v1/relation/user/:uid/me', followController.getUserRelation);

/**
 * 获取uid的关注列表{users,groups}
 */
router.get('/api/v1/relation/user/:uid/follows', followController.getUserFollowList);

/**
 * 获取uid的粉丝列表
 */
router.get('/api/v1/relation/user/:uid/followers', followController.getUserFollowerList);

/**
 * 获取用户组关系状态(0:未关注, 1:已关注)
 */
router.get('/api/v1/relation/group/:gid/me', followController.getGroupRelation);

/**
 * 获取用户组粉丝列表
 */
router.get('/api/v1/relation/group/:gid/followers', followController.getGroupFollowerList);

/**
 * 获取uid的可能认识列表
 */
router.get('/api/v1/relation/maybeknow', followController.getMaybeKnowList);

module.exports = router;
