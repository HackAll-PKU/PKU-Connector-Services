/**
 * Created by Kou Yuting on 2016/5/9.
 */
var pool = require("./BaseModel.js");
var defaultConf = require("../conf/default.json");
var TALKINGS_PER_PAGE = 10;

/**
 * 说说构造方法
 * @param tid tid
 * @param text 说说文本
 * @param image 说说图片
 * @param uid 发布者的uid
 * @param gid talking所在group
 */
function Talking(tid, text, image, uid, gid) {
    this.tid = tid;
    this.text = text || "";
    this.image = image;
    this.user_uid = uid;
    this.group_gid = gid;
}

/**
 * 添加新说说
 *  @param completionHandler 返回闭包,包含err, result
 */
Talking.prototype.addTalkingToDatabase = function (completionHandler) {
    var requestTalking = this;
    if (this.text == "" && !this.image) {
        completionHandler({code: 400, msg: "内容不能为空"}, null);
        return;
    }
    pool.getConnection(function (err, connection) {
        if (err) {
            completionHandler({code: 500, msg: "连接数据库错误"}, null);
            return;
        }
        connection.query('INSERT INTO `PKU-Connector`.`talking` (`text`, `image`, `user_uid`, `group_gid`) VALUES (?, ?, ?, ?)',
            [requestTalking.text, requestTalking.image, requestTalking.user_uid, requestTalking.group_gid],
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
 * 获取说说
 *  @param currentUid 当前登录用户的uid
 *  @param completionHandler 返回闭包,包含err和rows
 */
Talking.prototype.getTalkingInfo = function (currentUid, completionHandler) {
    var requestTid = this.tid;
    if (!requestTid) {
        completionHandler({code: 400, msg: "blank tid"}, null);
        return;
    }
    pool.getConnection(function (err, connection) {
        if (err) {
            completionHandler({code: 500, msg: "连接数据库错误"}, null);
            return;
        }
        connection.query(
            'SELECT `talking`.*, (CASE WHEN `like`.`user_uid` IS NULL THEN 0 ELSE 1 END) AS `liked`, COUNT(`like2`.`user_uid`) AS `likes` ' +
            'FROM `PKU-Connector`.`talking` LEFT JOIN `PKU-Connector`.`like` ' +
            'ON `talking`.`tid` = `like`.`talking_tid` AND `like`.`user_uid` = ? ' +
            'LEFT JOIN `PKU-Connector`.`like` AS `like2` ON `talking`.`tid` = `like2`.`talking_tid` ' +
            'WHERE `talking`.`tid` = ?',
            [currentUid, requestTid],
            function (err, rows) {
                connection.release();
                if (err)
                    completionHandler({code: 400, msg: err.code}, null);
                else if (rows.length > 0 && rows[0].tid)
                    completionHandler(null, rows[0]);
                else
                    completionHandler({code: 400, msg: "没有此说说"}, null);
            });
    });
};

/**
 * 获取uid的说说
 *  @param currentUid 当前登录用户的uid
 *  @param after 查询此timestamp以后的说说
 *  @param page 页数
 *  @param completionHandler 返回闭包,包含err和rows
 */
Talking.prototype.getTalkingsOfUser = function (currentUid, after, page, completionHandler) {
    var requestUid = this.user_uid;
    var requestOffset = ((page || 1) - 1) * TALKINGS_PER_PAGE;
    if (!requestUid) {
        completionHandler({code: 400, msg: "blank uid"}, null);
        return;
    }
    pool.getConnection(function (err, connection) {
        if (err) {
            completionHandler({code: 500, msg: "连接数据库错误"}, null);
            return;
        }
        connection.query(
            'SELECT `talking`.*, (CASE WHEN `like`.`user_uid` IS NULL THEN 0 ELSE 1 END) AS `liked`, COUNT(`like2`.`user_uid`) AS `likes` ' +
            'FROM `PKU-Connector`.`talking` LEFT JOIN `PKU-Connector`.`like` ON `talking`.`tid` = `like`.`talking_tid` AND `like`.`user_uid` = ? ' +
            'LEFT JOIN `PKU-Connector`.`like` AS `like2` ON `talking`.`tid` = `like2`.`talking_tid` '+
            'WHERE `talking`.`user_uid` = ? ' +
            (after ? 'AND UNIX_TIMESTAMP(`talking`.`timestamp`) > ? ' : '') +
            'GROUP BY `talking`.`tid` ' +
            'ORDER BY `talking`.`timestamp` DESC LIMIT ?, ?',
            after ? [currentUid, requestUid, after, requestOffset, TALKINGS_PER_PAGE]
                : [currentUid, requestUid, requestOffset, TALKINGS_PER_PAGE],
            function (err, rows) {
                if (err) {
                    connection.release();
                    completionHandler({code: 400, msg: err.code}, null);
                } else {
                    if (!page) {
                        connection.query('SELECT COUNT(`tid`) AS `num` FROM `PKU-Connector`.`talking` WHERE `user_uid` = ?' +
                            (after ? ' AND UNIX_TIMESTAMP(`timestamp`) > ?' : ''),
                            after ? [requestUid, after] : [requestUid],
                            function (err, num) {
                                connection.release();
                                if (!err) completionHandler(null, {rows: rows, pages: Math.ceil(num[0].num / TALKINGS_PER_PAGE)});
                                else completionHandler(null, {rows: rows});
                            });
                    } else {
                        connection.release();
                        completionHandler(null, {rows: rows});
                    }
                }
            });
    });
};

/**
 * 获取uid的说说数
 *  @param completionHandler 返回闭包,包含err和rows
 */
Talking.prototype.getTalkingCountOfUser = function (completionHandler) {
    var requestUid = this.user_uid;
    if (!requestUid) {
        completionHandler({code: 400, msg: "blank uid"}, null);
        return;
    }
    pool.getConnection(function (err, connection) {
        if (err) {
            completionHandler({code: 500, msg: "连接数据库错误"}, null);
            return;
        }
        connection.query('SELECT COUNT(`tid`) AS `cnt` FROM `PKU-Connector`.`talking` WHERE `user_uid` = ?',
            [requestUid],
            function (err, rows) {
                connection.release();
                if (err) {
                    completionHandler({code: 400, msg: err.code}, null);
                } else {
                    completionHandler(null, rows[0].cnt);
                }
            });
    });
};

/**
 * 获取gid的说说
 *  @param currentUid 当前登录用户的uid
 *  @param after 查询此timestamp以后的说说
 *  @param page 页数
 *  @param completionHandler 返回闭包,包含err和rows
 */
Talking.prototype.getTalkingsOfGroup = function (currentUid, after, page, completionHandler) {
    var requestGid = this.group_gid;
    var requestOffset = ((page || 1) - 1) * TALKINGS_PER_PAGE;
    if (!requestGid) {
        completionHandler({code: 400, msg: "blank gid"}, null);
        return;
    }
    pool.getConnection(function (err, connection) {
        if (err) {
            completionHandler({code: 500, msg: "连接数据库错误"}, null);
            return;
        }
        connection.query('SELECT `talking`.*, (CASE WHEN `like`.`user_uid` IS NULL THEN 0 ELSE 1 END) AS `liked`, COUNT(`like2`.`user_uid`) AS `likes` ' +
            'FROM `PKU-Connector`.`talking` LEFT JOIN `PKU-Connector`.`like` ' +
            'ON `talking`.`tid` = `like`.`talking_tid` AND `like`.`user_uid` = ? ' +
            'LEFT JOIN `PKU-Connector`.`like` AS `like2` ON `talking`.`tid` = `like2`.`talking_tid` ' +
            'WHERE `talking`.`group_gid` = ? ' +
            (after ? 'AND UNIX_TIMESTAMP(`talking`.`timestamp`) > ? ' : '') +
            'GROUP BY `talking`.`tid` ' +
            'ORDER BY `talking`.`timestamp` DESC LIMIT ?, ?',
            after ? [currentUid, requestGid, after, requestOffset, TALKINGS_PER_PAGE]
                  : [currentUid, requestGid, requestOffset, TALKINGS_PER_PAGE],
            function (err, rows) {
                if (err) {
                    connection.release();
                    completionHandler({code: 400, msg: err.code}, null);
                } else {
                    if (!page) {
                        connection.query('SELECT COUNT(`tid`) AS `num` FROM `PKU-Connector`.`talking` WHERE `group_gid` = ?' +
                            (after ? ' AND UNIX_TIMESTAMP(`timestamp`) > ?' : ''),
                            after ? [requestGid, after] : [requestGid],
                            function (err, num) {
                                connection.release();
                                if (!err) completionHandler(null, {rows: rows, pages: Math.ceil(num[0].num / TALKINGS_PER_PAGE)});
                                else completionHandler(null, {rows: rows});
                            });
                    } else {
                        connection.release();
                        completionHandler(null, {rows: rows});
                    }
                }
            });
    });
};

/**
 * 获取gid的说说数
 *  @param completionHandler 返回闭包,包含err和rows
 */
Talking.prototype.getTalkingCountOfGroup = function (completionHandler) {
    var requestGid = this.group_gid;
    if (!requestGid) {
        completionHandler({code: 400, msg: "blank gid"}, null);
        return;
    }
    pool.getConnection(function (err, connection) {
        if (err) {
            completionHandler({code: 500, msg: "连接数据库错误"}, null);
            return;
        }
        connection.query('SELECT COUNT(`tid`) AS `cnt` FROM `PKU-Connector`.`talking` WHERE `group_gid` = ?',
            [requestGid],
            function (err, rows) {
                connection.release();
                if (err) {
                    completionHandler({code: 400, msg: err.code}, null);
                } else {
                    completionHandler(null, rows[0].cnt);
                }
            });
    });
};

/**
 * 获取当前登录用户自己以及所有关注人以及group的说说
 *  @param currentUid 当前登录用户的uid
 *  @param after 查询此timestamp以后的说说
 *  @param page 页数
 *  @param completionHandler 返回闭包,包含err和rows
 */
Talking.prototype.getFollowedTalkings = function (currentUid, after, page, completionHandler) {
    var requestUid = this.user_uid;
    var requestOffset = ((page || 1) - 1) * TALKINGS_PER_PAGE;
    pool.getConnection(function (err, connection) {
        if (err) {
            completionHandler({code: 500, msg: "连接数据库错误"}, null);
            return;
        }
        connection.query(
            'SELECT DISTINCT `talking`.*, (CASE WHEN `like`.`user_uid` IS NULL THEN 0 ELSE 1 END) AS `liked`, COUNT(`like2`.`user_uid`) AS `likes` ' +
            'FROM `PKU-Connector`.`talking` LEFT JOIN `PKU-Connector`.`follow` ON `talking`.`user_uid` = `follow`.`follow` ' +
            'LEFT JOIN `PKU-Connector`.`user_in_group` ON `talking`.`group_gid` = `user_in_group`.`group_gid` ' +
            'LEFT JOIN `PKU-Connector`.`like` ON `talking`.`tid` = `like`.`talking_tid` AND `like`.`user_uid` = ? ' +
            'LEFT JOIN `PKU-Connector`.`like` AS `like2` ON `talking`.`tid` = `like2`.`talking_tid` ' +
            'WHERE (`follow`.`follower` = ? ' +
            'OR `user_in_group`.`user_uid` = ? ' +
            'OR `talking`.`user_uid` = ?) ' +
            (after ? 'AND UNIX_TIMESTAMP(`talking`.`timestamp`) > ? ' : '') +
            'GROUP BY `talking`.`tid` ' +
            'ORDER BY `timestamp` DESC ' +
            'LIMIT ?, ?',
            after ? [currentUid, requestUid, requestUid, requestUid, after, requestOffset, TALKINGS_PER_PAGE]
                  : [currentUid, requestUid, requestUid, requestUid, requestOffset, TALKINGS_PER_PAGE],
            function (err, rows) {
                if (err) {
                    connection.release();
                    completionHandler({code: 400, msg: err.code}, null);
                } else {
                    if (!page) {
                        connection.query(
                            'SELECT COUNT(DISTINCT `PKU-Connector`.`talking`.`tid`) AS `num` ' +
                            'FROM `PKU-Connector`.`talking` LEFT JOIN `PKU-Connector`.`follow` ON `talking`.`user_uid` = `follow`.`follow` ' +
                            'LEFT JOIN `PKU-Connector`.`user_in_group` ON `talking`.`group_gid` = `user_in_group`.`group_gid`' +
                            'WHERE (`follow`.`follower` = ? ' +
                            'OR `user_in_group`.`user_uid` = ? ' +
                            'OR `talking`.`user_uid` = ?) ' +
                            (after ? ' AND UNIX_TIMESTAMP(`talking`.`timestamp`) > ?' : ''),
                            after ? [requestUid, requestUid, requestUid, after]
                                  : [requestUid, requestUid, requestUid],
                            function (err, num) {
                                connection.release();
                                if (!err) completionHandler(null, {rows: rows, pages: Math.ceil(num[0].num / TALKINGS_PER_PAGE)});
                                else completionHandler(null, {rows: rows});
                            });
                    } else {
                        connection.release();
                        completionHandler(null, {rows: rows});
                    }
                }
            });
    });
};

/**
 * 获取当前登录用户自己以及所有关注人以及group的新说说个数
 *  @param after 查询此timestamp以后的说说
 *  @param completionHandler 返回闭包,包含err和rows
 */
Talking.prototype.getNewFollowedTalkingsCount = function (after, completionHandler) {
    var requestUid = this.user_uid;
    if (!after) {
        completionHandler({code: 400, msg: "param after required!"}, null);
        return;
    }
    pool.getConnection(function (err, connection) {
        if (err) {
            completionHandler({code: 500, msg: "连接数据库错误"}, null);
            return;
        }
        connection.query(
            'SELECT COUNT(DISTINCT `PKU-Connector`.`talking`.`tid`) AS `num` ' +
            'FROM `PKU-Connector`.`talking` LEFT JOIN `PKU-Connector`.`follow` ON `talking`.`user_uid` = `follow`.`follow` ' +
            'LEFT JOIN `PKU-Connector`.`user_in_group` ON `talking`.`group_gid` = `user_in_group`.`group_gid`' +
            'WHERE (`follow`.`follower` = ? ' +
            'OR `user_in_group`.`user_uid` = ? ' +
            'OR `talking`.`user_uid` = ?) ' +
            'AND UNIX_TIMESTAMP(`talking`.`timestamp`) > ?',
            [requestUid, requestUid, requestUid, after],
            function (err, num) {
                connection.release();
                if (err) completionHandler({code: 400, msg: err.code}, null);
                else completionHandler(null, num[0].num);
            });
    });
};

/**
 * 删除该条说说
 * @param completionHandler 返回闭包,包含err和affectedRows
 */
Talking.prototype.deleteTalking = function (completionHandler) {
    var requestTid = this.tid;
    var requestUid = this.user_uid;
    if (!requestTid) {
        completionHandler({code: 400, msg: "invalid tid"}, null);
        return;
    }
    pool.getConnection(function (err, connection) {
        if (err) {
            completionHandler({code: 500, msg: "连接数据库错误"}, null);
            return;
        }
        //查询被删说说的uid
        connection.query('SELECT `user_uid` FROM `PKU-Connector`.`talking` WHERE `tid` = ?', [requestTid],
            function (err, rows) {
                if (err) {
                    connection.release();
                    completionHandler({code: 400, msg: err.code}, null);
                    return;
                } else if (rows.length == 0) {
                    connection.release();
                    completionHandler({code: 400, msg: "该说说不存在"}, null);
                    return;
                }

                //检查uid是否相符
                if (requestUid != rows[0].user_uid) {
                    connection.release();
                    completionHandler({code: 403, msg: "sorry, 你没有权限删除这条说说"}, null);
                    return;
                }

                //删除其评论
                var comment = require("./Comment.js");
                comment.ensureSafeTalkingDeletion(requestTid, function (err, result) {
                    if (err) {
                        connection.release();
                        completionHandler({code: err.code, msg: err.msg}, null);
                    } else {
                        //删除所有的赞
                        connection.query('DELETE FROM `PKU-Connector`.`like` WHERE `talking_tid` = ?', [requestTid],
                            function (err) {
                                if (err) {
                                    connection.release();
                                    completionHandler({code: 400, msg: err.code}, null);
                                } else {
                                    //删除说说
                                    connection.query('DELETE FROM `PKU-Connector`.`talking` WHERE `tid` = ?', [requestTid],
                                        function (err, result2) {
                                            connection.release();
                                            if (err) completionHandler({code: 400, msg: err.code}, null);
                                            else completionHandler(null, {
                                                affectedTalkings: result2.affectedRows,
                                                affectedComments: result
                                            });
                                        }
                                    );
                                }
                            }
                        );
                    }
                });
            });
    });
};

exports.Talking = Talking;