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
 */
