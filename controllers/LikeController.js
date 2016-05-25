/**
 * Created by kouyuting on 2016/5/24.
 */
var model = require("../models/Like.js");
/**
 * 给talking点赞
 */
exports.likeUser = function (req,res) {
    var likeRelation = new model.LikeRelation(req.tokenInfo.uid, req.params.tid);
    likeRelation.likeUser(function (err) {
        if(err)
            res.status(err.code).json({msg:err.msg});
        else
            res.status(201).json({msg:"OK"});
    })
};

/**
 * 取赞说说
 */
exports.unlikeUser = function (req,res) {
    var likeRelation = new model.LikeRelation(req.tokenInfo.uid, req.params.tid);
    likeRelation.unlikeUser(function(err){
        if (err)
            res.status(err.code).json({msg:err.msg});
        else
            res.json({msg:"OK"});
    })
};