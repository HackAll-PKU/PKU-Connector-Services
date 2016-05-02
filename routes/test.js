/**
 * Created by ChenLetian on 16/5/1.
 */
var express = require('express');
var router = express.Router();

/**
 *  for test
 *  feel free to test some developing function
 */
router.post('/test', function (req, res) {
    var model = require("../models/User.js");
    var user = new model.User(req.body.uname, req.body.password, req.body.nickname, req.body.avatar,
                        req.body.background, req.body.gender, req.body.signature, req.body.birthday,
                        req.body.department, req.body.enrollmentYear);
    user.addUserToDatabase(function(err, result) {
        if (err)
            res.status(500).json({code: 1, msg: "添加用户失败"});
        else
            res.json({code: 0, data: {uid: result.insertId}});
    });
});

module.exports = router;
