"use strict";
var express = require('express');
var router = express.Router();
var db = require('./db');

router.delete('/',function(req,res){
    console.log(req.body);
    var data  = {id: req.body.id};

    db.connection.query('DELETE from WRH where id=?;', data.id, function(err, rows, fields) {
        if (err) throw err;
        // console.log('The solution is: ', rows);
        res.send("OK");
    });
});

router.post('/',function(req,res){
    console.log(req.body);
    var data  = {r_id: req.body.rang, w_id: req.body.id, hours: req.body.hours};

    // db.connection.connect();
    db.connection.query('INSERT INTO WRH SET ?;', data, function(err, rows, fields) {
        // db.connection.end();
        if (err) throw err;
        // console.log('The solution is: ', rows);
        res.send("OK");
    });
});

router.put('/',function(req,res){
    console.log(req.body);
    var data  = [req.body.rang, req.body.hours, parseInt(req.body.id)];

    // db.connection.connect();
    db.connection.query('UPDATE WRH SET `r_id` = ?, `hours` = ? where `id` = ?', data, function(err, rows, fields) {
        // db.connection.end();
        if (err) throw err;
        // console.log('The solution is: ', rows);
        res.send("OK");
    });
});

module.exports = router;
