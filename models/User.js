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

User.prototype.addUserToDatabase = function(completionHandler) {
    var requestUser = this;
    if (!(requestUser.uname && requestUser.password)) {
        completionHandler({code:400, msg: "用户名或密码为空"}, null);
        return;
    }
    pool.getConnection(function (err, conncetion) {
        if (err) completionHandler({code:400, msg: err.code}, null);
        conncetion.query('INSERT INTO `PKU-Connector`.`user` (`uname`, `password`, `nickname`, `avatar`, `background`, `gender`, `signature`, `birthday`, `department`, `enrollment_year`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [requestUser.uname, requestUser.password, requestUser.nickname, requestUser.avatar, requestUser.background, requestUser.gender, requestUser.signature, requestUser.birthday, requestUser.department, requestUser.enrollmentYear],
            function (err, result) {
                conncetion.release();
                if (err)
                    completionHandler({code:400, msg: err.code}, null);
                else
                    completionHandler(null, result);
            });
    });
};


exports.User = User;