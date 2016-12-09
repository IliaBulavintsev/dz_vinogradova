"use strict";
var mysql      = require('mysql');

exports.connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'tp',
  database :  'dz',
  password : 'password'
});
