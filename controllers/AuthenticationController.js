/**
 * Created by ChenLetian on 16/5/2.
 */

var model = require("../models/User.js");
var jwt = require('jsonwebtoken');
var tokenConf = require('../conf/token.json');

exports.authenticateUser = function (req, res) {
    var uname = req.body.uname;
    var password = req.body.password;
    var user = new model.User(null, uname, password);
    user.authenticate(function (err, result) {
        if (err)
            res.status(err.code).json({msg: err.msg});
        else if (!(result.password === password))
            res.status(401).json({msg: "用户名或密码错误"});
        else {
            var token = jwt.sign({uname: uname, uid: result.uid}, tokenConf.token_secret, tokenConf.options);
            res.json({token: token});
        }
    });
};

exports.verifyToken = function (req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader === 'undefined') {
        if (needAuthenticated(req))
            res.status(403).json({msg: "尚未认证,无法使用此服务"});
        else
            next();
        return;
    }
    var bearer = bearerHeader.split(":");
    bearerToken = bearer[1];
    req.token = bearerToken;
    var token = req.token;
    jwt.verify(token, tokenConf.token_secret, function(err, decoded) {
        if (err) {
            switch (err.name) {
                case "TokenExpiredError":
                    if (needAuthenticated(req))
                        res.status(403).json({msg: "token已失效,请重新登录"});
                    else
                        next();
                    break;
                case "JsonWebTokenError":
                    if (needAuthenticated(req))
                        res.status(403).json({msg: "token无效,请重新登录"});
                    else
                        next();
                    break;
                default:
                    if (needAuthenticated(req))
                        res.status(403).json({msg: "token出现未知错误,请重新登录"});
                    else
                        next();
            }
        }
        else {
            req.tokenInfo = {
                uid: decoded.uid,
                uname: decoded.uname
            };
            next();
        }
    });
};

function needAuthenticated(req) {
    var doNotNeedAuthenticated = require("./DoNotNeedAuthenticated.json");
    for (var index in doNotNeedAuthenticated) {
        var noAuthenticatedRequest = doNotNeedAuthenticated[index];
        if ((noAuthenticatedRequest.path == req.path) && (noAuthenticatedRequest.method == req.method)) {
            return false;
        }
    }
    return true;
}