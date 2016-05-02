/**
 * Created by ChenLetian on 16/5/2.
 */

var model = require("../models/User.js");

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

exports.getUserInfo = function (req, res) {
    var user = new model.User(req.params.uid);
    user.getUserInfo(function (err, result) {
        if (err)
            res.status(err.code).json({msg: err.msg});
        else
            res.json({msg: "OK", data: result});
    });
};