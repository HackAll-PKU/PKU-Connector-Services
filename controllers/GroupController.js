/**
 * Created by ChenLetian on 16/5/14.
 */
var model = require("../models/Group.js");

/**
 * 添加新组
 */
exports.addNewGroup = function (req, res) {
    var group = new model.Group(null, req.body.gname, req.body.avatar);
    group.addGroupToDatabase(function (err, result) {
        if (err)
            res.status(err.code).json({msg: err.msg});
        else
            res.status(201).json({msg: "OK", data: {gid: result.insertId}});
    });
};

/**
 * 获取组信息
 */
exports.getGroupInfo = function (req, res) {
    var group = new model.Group(req.params.gid);
    group.getGroupInfo(function (err, result) {
        if (err)
            res.status(err.code).json({msg: err.msg});
        else
            res.json({msg: "OK", data: result});
    });
};

/**
 * 修改组信息
 */
exports.modifyGroupInfo = function (req, res) {
    var group = new model.Group(req.params.gid, req.body.gname, req.body.avatar);
    group.modifyGroupInfo(function (err, result) {
        if (err)
            res.status(err.code).json({msg: err.msg});
        else
            res.json({msg: "OK"});
    });
};