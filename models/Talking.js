/**
 * Created by Kou Yuting on 2016/5/9.
 */
var mysql = require('mysql');
var pool  = mysql.createPool(require("../conf/db.json"));

module.exports = pool;