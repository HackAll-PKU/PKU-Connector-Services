/**
 * Created by Kou Yuting on 2016/5/10.
 */
var model = require("../models/Talking.js");

/**
 * 发布新说说
 */
exports.postNewTalking = function (req, res) {
    var talking = new model.Talking(null, req.body.text, req.body.image, req.tokenInfo.uid, req.body.gid);
    talking.addTalkingToDatabase(function (err, result) {
        if (err)
            res.status(err.code).json({msg: err.msg});
        else
            res.status(201).json({msg: "OK", data: {tid: result.insertId}});
    });
};

/**
 * 获取说说
 */
exports.getTalkingInfo = function (req, res) {
    var talking = new model.Talking(req.params.tid);
    talking.getTalkingInfo(function (err, result) {
        if (err)
            res.status(err.code).json({msg: err.msg});
        else
            res.json({msg: "OK", data: result});
    });
};

/**
 * 获取uid的所有说说
 */
exports.getTalkingsOfUser = function (req, res) {
    var talking = new model.Talking(null, null, null, req.params.uid);
    talking.getTalkingsOfUser(req.query.page, function (err, result) {
        if (err)
            res.status(err.code).json({msg: err.msg});
        else
            res.json({msg: "OK", data: result});
    });
};

/**
 * 获取gid的所有说说
 */
exports.getTalkingsOfGroup = function (req, res) {
    var talking = new model.Talking(null, null, null, null, req.params.gid);
    talking.getTalkingsOfGroup(function (err, result) {
        if (err)
            res.status(err.code).json({msg: err.msg});
        else
            res.json({msg: "OK", data: result});
    });
};

/**
 * 获取当前登录用户所有关注人以及group的的说说
 */
exports.getFollowedTalkings = function (req, res) {
    var talking = new model.Talking(null, null, null, req.tokenInfo.uid);
    talking.getFollowedTalkings(function (err, result) {
        if (err)
            res.status(err.code).json({msg: err.msg});
        else
            res.json({msg: "OK", data: result});
    });
};


/**
 * 删除说说
 */
exports.deleteTalking = function (req, res) {
    var talking = new model.Talking(req.params.tid, null, null, req.tokenInfo.uid);
    talking.deleteTalking(function (err, result) {
        if (err)
            res.status(err.code).json({msg: err.msg});
        else
            res.json({msg: "OK", data: result});
    });
};