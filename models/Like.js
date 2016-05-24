/**
 * Created by kouyuting on 2016/5/24.
 */
var pool = require("./BaseModel.js");
var defaultConf = require("../conf/default.json");

/**
 * 关系构造方法
 * @param user_uid 点赞者uid
 * @param talking_tid 说说的tid
 * @constructor
 */
function LikeRelation(user_uid, talking_tid) {
    this.user_uid = user_uid;
    this.talking_tid = talking_tid;
}
/**
 *给talking点赞
 * @param completionHandler 返回闭包,包含err
 */
LikeRelation.prototype.likeUser = function (completionHandler) {
    var userUid = this.user_uid;
    var talkingTid = this.talking_tid;
    
    if (!talkingTid){
        completionHandler({code: 400, msg: "blank tid"}, null);
        return;
    }
    pool.getConnection(function (err,connection) {
        if(err){
            completionHandler({code: 500, msg: "连接数据库错误"}, null);
            return;
        }
        connection.query('INSERT INTO `PKU-Connector`.`like` VALUES (?, ?)', [userUid, talkingTid],
            function (err) {
                connection.release();
                if (err)
                    completionHandler({code: 400, msg: err.code});
                else
                    completionHandler(null);
            });
    });
};
/**
 * 取赞tid
 * @param completionHandler 返回闭包,包含err
 */
LikeRelation.prototype.unlikeUser = function (completionHandler) {
    var userUid = this.user_uid;
    var talkingTid = this.talking_tid;
    if (!talkingTid){
        completionHandler({code: 400, msg: "blank tid"}, null);
        return;
    }

    pool.getConnection(function (err,connection){
        if(err){
            completionHandler({code:500,msg:"连接数据库错误"},null);
            return;
        }
        connection.query('DELETE FROM `PKU-Connector`.`like` WHERE `user_uid` = ? AND `talking_tid` = ?', [userUid, talkingTid],
        function (err) {
            connection.release();
            if (err)
                completionHandler({code: 400, msg: err.code});
            else
                completionHandler(null);
        });
    });
};
/**
 * 获取当前说说赞数
 */
LikeRelation.prototype.getLikeCount = function (completionHandler) {
    var userUid = this.user_uid;
    var talkingTid = this.talking_tid;
    if (!talkingTid){
        completionHandler({code: 400, msg: "blank tid"}, null);
        return;
    }
    pool.getConnection(function (err,connection) {
        if(err){
            completionHandler({code:500,msg:"连接数据库错误"},null);
            return;
        }
        connection.query('SELECT COUNT(`user_uid`) AS `cnt` FROM `PKU-Connector`.`like` WHERE `talking_tid` = ?',[talkingTid],
            function (err,rows) {
                connection.release();
                if (err) {
                    completionHandler({code: 400, msg: err.code}, null);
                } else {
                    completionHandler(null, rows[0].cnt);
                }
            });
    });
};
exports.LikeRelation = LikeRelation;