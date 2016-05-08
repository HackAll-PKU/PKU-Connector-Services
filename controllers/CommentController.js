/**
 * Created by HuShunxin on 16/5/8.
 */
var model = require("../models/Comment.js");

/**
 * 发表新评论
 */
exports.postNewComment = function (req, res) {
    var comment = new model.Comment(null, req.body.text, req.body.talking_tid, req.tokenInfo.uid, req.body.parent_cid);
    comment.addCommentToDatabase(function (err, result) {
        if (err)
            res.status(err.code).json({msg: err.msg});
        else
            res.status(201).json({msg: "OK", data: {cid: result.insertId}});
    });
};

/**
 * 获取评论
 */
exports.getComment = function (req, res) {
    var comment = new model.Comment(req.params.cid);
    comment.getComment(function (err, result) {
        if (err)
            res.status(err.code).json({msg: err.msg});
        else
            res.json({msg: "OK", data: result});
    });
};

/**
 * 删除评论(同时删除子评论)
 */
exports.deleteComment = function (req, res) {
    var comment = new model.Comment(req.params.cid, null, null, req.tokenInfo.uid, null);
    comment.deleteComment(function (err, result) {
        if (err)
            res.status(err.code).json({msg: err.msg});
        else
            res.json({msg: "OK", data: result}); 
    });
};