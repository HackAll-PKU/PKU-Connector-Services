/**
 * Created by ChenLetian on 16/5/14.
 */

var pool = require("./BaseModel.js");
var defaultConf = require("../conf/default.json");

/**
 * 组信息构造方法
 * @param gid gid
 * @param gname group的名字
 * @param avatar 头像URL
 * @constructor
 */
function Group(gid, gname, avatar) {
    this.gid = gid;
    this.gname = gname;
    this.avatar = avatar || defaultConf.default_avatar;
}

/**
 * 添加新组
 * @param completionHandler 返回闭包,包含err, result
 */
Group.prototype.addGroupToDatabase = function (completionHandler) {
    var requestGroup = this;
    if (!(requestGroup.gname)) {
        completionHandler({code: 400, msg: "组名为空"}, null);
        return;
    }
    pool.getConnection(function (err, connection) {
        if (err)
            completionHandler({code: 500, msg: "连接数据库错误"}, null);
        else {
            connection.query('INSERT INTO `PKU-Connector`.`group` (`gname`, `avatar`) VALUES (?, ?)',
                [requestGroup.gname, requestGroup.avatar],
                function (err, result) {
                    connection.release();
                    if (err)
                        completionHandler({code: 400, msg: err.code}, null);
                    else
                        completionHandler(null, result);
                });
        }
    });
};

/**
 * 获取组信息
 * @param completionHandler 返回闭包,包含err和rows
 */
Group.prototype.getGroupInfo = function (completionHandler) {
    var requestGid = this.gid;
    if (!requestGid) {
        completionHandler({code: 400, msg: "gid为空"}, null);
    }
    pool.getConnection(function (err, connection) {
        if (err) completionHandler({code: 500, msg: "连接数据库错误"}, null);
        connection.query('SELECT `gid`, `gname`, `avatar` FROM `PKU-Connector`.`group` WHERE `gid` = ?',
            [requestGid],
            function (err, rows) {
                connection.release();
                if (err)
                    completionHandler({code: 400, msg: err.code}, null);
                else if (rows.length > 0)
                    completionHandler(null, rows[0]);
                else
                    completionHandler({code: 400, msg: "没有此组"}, null);
            });
    });
};

/**
 * 更新组信息
 * @param completionHandler 返回闭包,包含err和result
 */
Group.prototype.modifyGroupInfo = function (completionHandler) {
    var requestGroup = this;
    if (!requestGroup.gid) {
        completionHandler({code: 400, msg: "gid为空"}, null);
    }
    pool.getConnection(function (err, connection) {
        if (err) completionHandler({code: 500, msg: "连接数据库错误"}, null);
        connection.query("UPDATE `PKU-Connector`.`group` SET `gname` = ?, `avatar` = ? WHERE `gid`=?",
            [requestGroup.gname, requestGroup.avatar, requestGroup.gid],
            function (err, result) {
                connection.release();
                if (err)
                    completionHandler({code: 400, msg: err.code}, null);
                else if (result.affectedRows > 0)
                    completionHandler(null, result);
                else
                    completionHandler({code: 400, msg: "没有此组"}, null);
            });
    });
};


exports.Group = Group;