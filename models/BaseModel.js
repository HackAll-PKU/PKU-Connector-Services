/**
 * Created by ChenLetian on 16/5/1.
 */

var mysql = require('mysql');
var pool  = mysql.createPool(require("../conf/db.json"));

module.exports = pool;