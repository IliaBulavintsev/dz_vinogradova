"use strict";
var express = require('express');
var router = express.Router();
var db = require('./db');

router.get('/',function(req,res){
    db.connection.query('SELECT * FROM Rangs;', function(err, rows, fields) {
        if (err) throw err;
        console.log('The solution is: ', rows);
        res.send(rows);
    });

});

router.post('/',function(req,res){
    console.log(req.body.rang_name);
    var data  = {rang: req.body.rang_name};

    db.connection.query('INSERT INTO Rangs SET ?;', data, function(err, rows, fields) {
        if (err) throw err;
        console.log('The solution is: ', rows);
        res.send("OK");
    });
});

router.delete('/',function(req,res){
    console.log(req.body);
    var data  = {id: req.body.id};

    db.connection.query('DELETE from Rangs where id=?;', data.id, function(err, rows, fields) {
        if (err) throw err;
        console.log('The solution is: ', rows);
        res.send("OK");
    });
});

router.put('/',function(req,res){
    console.log(req.body);
    var data  = [req.body.rang_name, parseInt(req.body.id)];

    // db.connection.connect();
    db.connection.query('UPDATE Rangs SET `rang` = ? where `id` = ?', data, function(err, rows, fields) {
        // db.connection.end();
        if (err) throw err;
        console.log('The solution is: ', rows);
        res.send("OK");
    });
});

module.exports = router;
