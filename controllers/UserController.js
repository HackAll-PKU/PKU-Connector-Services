/**
 * Created by ChenLetian on 16/5/2.
 */

var model = require("../models/User.js");

/**
 * 添加新用户
 */
exports.addNewUser = function (req, res) {
    var user = new model.User(null, req.body.uname, req.body.password, req.body.nickname, req.body.avatar,
        req.body.background, req.body.gender, req.body.signature, req.body.birthday,
        req.body.department, req.body.enrollmentYear);
    user.addUserToDatabase(function (err, result) {
        if (err)
            res.status(err.code).json({msg: err.msg});
        else
            res.status(201).json({msg: "OK", data: {uid: result.insertId}});
    });
};

/**
 * 获取用户个人信息
 */
exports.getUserInfo = function (req, res) {
    var user = new model.User(req.params.uid);
    user.getUserInfo(function (err, result) {
        if (err)
            res.status(err.code).json({msg: err.msg});
        else
            res.json({msg: "OK", data: result});
    });
};

/**
 * 修改用户个人信息
 */
exports.modifyUserInfo = function (req, res) {
    if (req.params.uid != req.tokenInfo.uid) {
        res.status(403).json({msg: "你没有权限修改此个人信息"});
        return;
    }
    var user = new model.User(req.params.uid, req.body.uname, req.body.password, req.body.nickname, req.body.avatar,
        req.body.background, req.body.gender, req.body.signature, req.body.birthday,
        req.body.department, req.body.enrollmentYear);
    user.modifyUserInfo(function (err, result) {
        if (err)
            res.status(err.code).json({msg: err.msg});
        else
            res.json({msg: "OK"});
    });
};

/**
 * 搜索用户
 */
exports.searchUser = function (req, res) {
    var user = new model.User(null, null, null, req.params.searchwords);
    user.searchUser(function (err, result) {
        if (err)
            res.status(err.code).json({msg: err.msg});
        else
            res.json({msg: "OK", data: result});
    });
};