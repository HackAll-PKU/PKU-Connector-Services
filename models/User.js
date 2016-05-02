/**
 * Created by ChenLetian on 16/5/1.
 */

var pool = require("./BaseModel.js");
var defaultConf = require("../conf/default.json");

function User(uname, password, nickname, avatar, background, gender, signature, birthday, department, enrollmentYear) {
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
    pool.getConnection(function (err, conncetion) {
        if (err) completionHandler(err, null);
        conncetion.query('INSERT INTO `PKU-Connector`.`user` (`uname`, `password`, `nickname`, `avatar`, `background`, `gender`, `signature`, `birthday`, `department`, `enrollment_year`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [requestUser.uname, requestUser.password, requestUser.nickname, requestUser.avatar, requestUser.background, requestUser.gender, requestUser.signature, requestUser.birthday, requestUser.department, requestUser.enrollmentYear],
            function (err, result) {
                if (err)
                    completionHandler(err, null);
                else
                    completionHandler(null, result);
            });
    });
};

exports.User = User;