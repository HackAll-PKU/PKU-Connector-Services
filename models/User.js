/**
 * Created by ChenLetian on 16/5/1.
 */

var pool = require("./BaseModel.js");
var defaultConf = require("../conf/default.json");

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

User.prototype.addUserToDatabase = function (completionHandler) {
    var requestUser = this;
    if (!(requestUser.uname && requestUser.password)) {
        completionHandler({code: 400, msg: "用户名或密码为空"}, null);
        return;
    }
    pool.getConnection(function (err, connection) {
        if (err) completionHandler({code: 400, msg: "连接数据库错误"}, null);
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

User.prototype.getUserInfo = function (completionHandler) {
    var requestUid = this.uid;
    if (!requestUid) {
        completionHandler({code: 400, msg: "uid为空"}, null);
    }
    pool.getConnection(function (err, connection) {
        if (err) completionHandler({code: 400, msg: "连接数据库错误"}, null);
        connection.query('SELECT `uname`, `nickname`, `avatar`, `background`, `gender`, `signature`, `birthday`, `department`, `enrollment_year` FROM `PKU-Connector`.`user` WHERE `uid` = ?',
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

User.prototype.updateUserInfo = function (completionHandler) {
    var requestUser = this;
    if (!requestUser.uid) {
        completionHandler({code: 400, msg: "uid为空"}, null);
    }
    pool.getConnection(function (err, connection) {
        if (err) completionHandler({code: 400, msg: "连接数据库错误"}, null);
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

User.prototype.authenticate = function (completionHandler) {
    var requestUname = this.uname;
    var requestPassword = this.password;
    if (!(requestUname && requestPassword)) {
        completionHandler({code: 400, msg: "用户名或密码为空"}, null);
    }
    pool.getConnection(function (err, connection) {
        if (err) completionHandler({code: 400, msg: "连接数据库错误"}, null);
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

exports.User = User;