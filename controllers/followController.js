/**
 * Created by HuShunxin on 16/5/12.
 */
var model = require("../models/Follow.js");

/**
 * 关注uid
 */
exports.followUser = function (req, res) {
    var relation = new model.Relation(req.tokenInfo.uid, req.params.uid);
    relation.followUser(function (err) {
        if (err)
            res.status(err.code).json({msg: err.msg});
        else
            res.status(201).json({msg: "OK"});
    });
};

/**
 * 关注gid
 */
exports.followGroup = function (req, res) {
    var relation = new model.Relation(req.tokenInfo.uid, null, req.params.gid);
    relation.followGroup(function (err) {
        if (err)
            res.status(err.code).json({msg: err.msg});
        else
            res.status(201).json({msg: "OK"});
    });
};

/**
 * 取关uid
 */
exports.unfollowUser = function (req, res) {
    var relation = new model.Relation(req.tokenInfo.uid, req.params.uid);
    relation.unfollowUser(function (err) {
        if (err)
            res.status(err.code).json({msg: err.msg});
        else
            res.json({msg: "OK"});
    });
};

/**
 * 取关gid
 */
exports.unfollowGroup = function (req, res) {
    var relation = new model.Relation(req.tokenInfo.uid, null, req.params.gid);
    relation.unfollowGroup(function (err) {
        if (err)
            res.status(err.code).json({msg: err.msg});
        else
            res.json({msg: "OK"});
    });
};

/**
 * 获取用户关系状态(0:无关系, 1:已关注, 2:被关注, 3:互相关注)
 */
exports.getUserRelation = function (req, res) {
    var relation = new model.Relation(req.tokenInfo.uid, req.params.uid);
    relation.getUserRelation(function (err, result) {
        if (err)
            res.status(err.code).json({msg: err.msg});
        else
            res.json({msg: "OK", data: result});
    });
};

/**
 * 获取uid的关注列表{users,groups}
 */
exports.getUserFollowList = function (req, res) {
    var relation = new model.Relation(req.params.uid);
    relation.getUserFollowList(function (err, result) {
        if (err)
            res.status(err.code).json({msg: err.msg});
        else
            res.json({msg: "OK", data: result});
    });
};

/**
 * 获取uid的粉丝列表
 */
exports.getUserFollowerList = function (req, res) {
    var relation = new model.Relation(null, req.params.uid);
    relation.getUserFollowerList(function (err, result) {
        if (err)
            res.status(err.code).json({msg: err.msg});
        else
            res.json({msg: "OK", data: result});
    });
};

/**
 * 获取用户组关系状态(0:未关注, 1:已关注)
 */
exports.getGroupRelation = function (req, res) {
    var relation = new model.Relation(req.tokenInfo.uid, null, req.params.gid);
    relation.getGroupRelation(function (err, result) {
        if (err)
            res.status(err.code).json({msg: err.msg});
        else
            res.json({msg: "OK", data: result});
    });
};

/**
 * 获取gid的粉丝列表
 */
exports.getGroupFollowerList = function (req, res) {
    var relation = new model.Relation(null, null, req.params.gid);
    relation.getGroupFollowerList(function (err, result) {
        if (err)
            res.status(err.code).json({msg: err.msg});
        else
            res.json({msg: "OK", data: result});
    });
};

/**
 * 获取uid的可能认识列表
 */
exports.getMaybeKnowList = function (req, res) {
    var relation = new model.Relation(req.tokenInfo.uid);
    relation.getMaybeKnowList(function (err, result) {
        if (err)
            res.status(err.code).json({msg: err.msg});
        else
            res.json({msg: "OK", data: result});
    });
};