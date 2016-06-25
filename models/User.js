/**
 * Created by ChenLetian on 16/5/1.
 */

var pool = require("./BaseModel.js");
var defaultConf = require("../conf/default.json");

/**
 * 用户信息构造方法
 * @param uid uid
 * @param uname 用户名
 * @param password 密码
 * @param nickname 昵称
 * @param avatar 头像URL
 * @param background 背景URL
 * @param gender 性别
 * @param signature 个性签名
 * @param birthday 生日
 * @param department 院系
 * @param enrollmentYear 入学年份
 * @constructor
 */
function User(uid, uname, password, nickname, avatar, background, gender, signature, birthday, department, enrollmentYear) {
    this.uid = uid;
    this.uname = uname;
    this.password = password;
    this.nickname = nickname || uname;
    this.avatar = avatar || defaultConf.default_avatar;
    this.background = background || defaultConf.default_background;
    this.gender = gender;
    this.signature = signature || "";
    this.birthday = birthday;
    this.department = department;
    this.enrollmentYear = enrollmentYear;
}

/**
 * 添加新用户
 * @param completionHandler 返回闭包,包含err, result
 */
User.prototype.addUserToDatabase = function (completionHandler) {
    var requestUser = this;
    if (!(requestUser.uname && requestUser.password)) {
        completionHandler({code: 400, msg: "用户名或密码为空"}, null);
        return;
    }
    pool.getConnection(function (err, connection) {
        if (err) {
            completionHandler({code: 500, msg: "连接数据库错误"}, null);
            return;
        }
        connection.query('INSERT INTO `PKU-Connector`.`user` (`uname`, `password`, `nickname`, `avatar`, `background`, `gender`, `signature`, `birthday`, `department`, `enrollment_year`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [requestUser.uname, requestUser.password, requestUser.nickname, requestUser.avatar, requestUser.background, requestUser.gender, requestUser.signature, requestUser.birthday, requestUser.department, requestUser.enrollmentYear],
            function (err, result) {
                connection.release();
                if (err)
                    completionHandler({code: 400, msg: err.code}, null);
                else
                    completionHandler(null, result);
            });
    });
};

/**
 * 获取用户个人信息
 * @param completionHandler 返回闭包,包含err和rows
 */
User.prototype.getUserInfo = function (completionHandler) {
    var requestUid = this.uid;
    if (!requestUid) {
        completionHandler({code: 400, msg: "uid为空"}, null);
        return;
    }
    pool.getConnection(function (err, connection) {
        if (err) {
            completionHandler({code: 500, msg: "连接数据库错误"}, null);
            return;
        }
        connection.query('SELECT `uid`, `uname`, `nickname`, `avatar`, `background`, `gender`, `signature`, `birthday`, `department`, `enrollment_year` FROM `PKU-Connector`.`user` WHERE `uid` = ?',
            [requestUid],
            function (err, rows) {
                connection.release();
                if (err)
                    completionHandler({code: 400, msg: err.code}, null);
                else if (rows.length > 0)
                    completionHandler(null, rows[0]);
                else
                    completionHandler({code: 400, msg: "没有此用户"}, null);
            });
    });
};

/**
 * 更新用户个人信息
 * @param completionHandler 返回闭包,包含err和result
 */
User.prototype.modifyUserInfo = function (completionHandler) {
    var requestUser = this;
    if (!requestUser.uid) {
        completionHandler({code: 400, msg: "uid为空"}, null);
        return;
    }
    pool.getConnection(function (err, connection) {
        if (err) {
            completionHandler({code: 500, msg: "连接数据库错误"}, null);
            return;
        }
        connection.query("UPDATE `PKU-Connector`.`user` SET `uname` = ?, `nickname` = ?, `avatar` = ?, `background` = ?, `gender` = ?, `signature` = ?, `birthday` = ?, `department` = ?, `enrollment_year` = ? WHERE `uid`=?",
            [requestUser.uname, requestUser.nickname, requestUser.avatar, requestUser.background, requestUser.gender, requestUser.signature, requestUser.birthday, requestUser.department, requestUser.enrollmentYear, requestUser.uid],
            function (err, result) {
                connection.release();
                if (err)
                    completionHandler({code: 400, msg: err.code}, null);
                else if (result.affectedRows > 0)
                    completionHandler(null, result);
                else
                    completionHandler({code: 400, msg: "没有此用户"}, null);
            });
    });
};

/**
 * 验证用户名密码是否正确
 * @param completionHandler 返回闭包,包含err和rows
 */
User.prototype.authenticate = function (completionHandler) {
    var requestUname = this.uname;
    var requestPassword = this.password;
    if (!(requestUname && requestPassword)) {
        completionHandler({code: 400, msg: "用户名或密码为空"}, null);
        return;
    }
    pool.getConnection(function (err, connection) {
        if (err) {
            completionHandler({code: 500, msg: "连接数据库错误"}, null);
            return;
        }
        connection.query("SELECT uid, password FROM `PKU-Connector`.`user` WHERE `uname` = ?",
            [requestUname],
            function (err, rows) {
                connection.release();
                if (err)
                    completionHandler({code: 400, msg: err.code}, null);
                else if (rows.length > 0)
                    completionHandler(null, rows[0]);
                else
                    completionHandler({code: 400, msg: "没有此用户"}, null);
            });
    });
};

/**
 * 搜索用户
 * @param completionHandler 返回闭包,包含err和rows
 */
User.prototype.searchUser = function (completionHandler) {
    var searchUserName = this.nickname;
    if (!searchUserName) {
        completionHandler({code: 400, msg: "搜索名称为空"}, null);
        return;
    }
    pool.getConnection(function (err, connection) {
        if (err) {
            completionHandler({code: 500, msg: "连接数据库错误"}, null);
            return;
        }
        connection.query("SELECT uid, nickname FROM `PKU-Connector`.`user` WHERE `nickname` like ?",
            ['%' + searchUserName + '%'],
            function (err, rows) {
                connection.release();
                if (err)
                    completionHandler({code: 400, msg: err.code}, null);
                else
                    completionHandler(null, rows);
            });
    });
};

exports.User = User;