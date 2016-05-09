/**
 * Created by ChenLetian on 16/5/1.
 */
var express = require('express');
var router = express.Router();

/**
 *  for test
 *  feel free to test some developing function
 */
//var authenticationController = require("../controllers/AuthenticationController.js");
//router.post('/test', authenticationController.authenticateUser);
var comment = require("../models/Comment.js");
router.post('/test/:tid', function (req, res) {
    var result = comment.ensureSafeTalkingDeletion(req.params.tid, function (err, result) {
        if (err)
            res.status(400).json({msg: "error"});
        else
            res.json({msg: "OK", data: result});
    });
});

module.exports = router;
