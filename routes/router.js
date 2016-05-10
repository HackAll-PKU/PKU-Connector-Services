/**
 * Created by ChenLetian on 16/4/18.
 */

module.exports = function(app) {
    // 身份验证模块
    var authenticationHandler = require("./authentication.js");
    app.use(authenticationHandler);
    // index模块
    var indexHandler = require("./index.js");
    app.use(indexHandler);
    // 用户相关的api模块
    var userHandler = require('./user.js');
    app.use(userHandler);
    //说说相关的api模块
    var talkingHandler = require('./talking.js');
    app.use(talkingHandler);
    // 评论相关的api模块
    var commentHandler = require('./comment.js');
    app.use(commentHandler);
    // 在此处添加其他的路由器,按照功能划分
    var testHandler = require("./test.js");
    app.use(testHandler);
};
