/**
 * Created by Kou Yuting on 2016/5/9.
 */
var pool = require("./BaseModel.js");
var defaultConf = require("../conf/default.json");

/**
 * 说说构造方法
 * @param tid tid
 * @param text 说说文本
 * @param image 说说图片
 * @param uid 发布者的uid
 * @param gid talking所在group
 * @param timestamp 发布说说的时间信息
 */
function Talking(tid, text, image, uid, gid, timestamp) {
    this.tid = tid;
    this.text = text;
    this.image = image;
    this.uid = uid;
    this.gid = gid;
    this.timestamp = timestamp;
}

/**
 * 添加新说说
 *  @param completionHandler 返回闭包,包含err, result
 */
Talking.prototype.addTalkingToDatabase = function (completionHandler) {

}
/**
 * 获取uid的说说
 *  @param completionHandler 返回闭包,包含err和rows
 */
Talking.prototype.getMyTalkings = function (completionHandler) {
    
}
/**
 * 删除该条说说
 * @param completionHandler 返回闭包,包含err和affectedRows
 */
Talking.prototype.deleteTalking = function(completionHandler){

}

exports.Talking = Talking;