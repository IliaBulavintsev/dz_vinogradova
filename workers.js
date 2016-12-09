"use strict";
var express = require('express');
var router = express.Router();
var db = require('./db');


router.get('/',function(req,res){
    // db.connection.connect();
    var result = {};
    db.connection.query('SELECT * FROM Workers;', function(err, rows, fields) {
        // db.connection.end();
        if (err) throw err;
        // console.log('The solution is: ', rows);
        result['workers'] = rows;
        db.connection.query('select w.id, w.w_id, w.r_id, w.hours, r.rang from WRH as w join Rangs as r on w.r_id = r.id;', function(err, rows, fields) {
            // db.connection.end();
            if (err) throw err;
            // console.log('The solution is: ', rows);
            // result['rangs'] = rows;
            // res.send(result);
            for (var i=0; i < rows.length; ++i){
                if (result[rows[i].w_id]){
                    result[rows[i].w_id].push(rows[i]);
                } else {
                    result[rows[i].w_id] = [];
                    result[rows[i].w_id].push(rows[i]);
                }
            }
            console.log(result);
            res.send(result);

        });


    });



});

router.post('/',function(req,res){
    console.log(req.body);
    var data  = {fname: req.body.fname, lname: req.body.lname};

    // db.connection.connect();
    db.connection.query('INSERT INTO Workers SET ?;', data, function(err, rows, fields) {
        // db.connection.end();
        if (err) throw err;
        console.log('The solution is: ', rows);
        res.send("OK");
    });
});

router.delete('/',function(req,res){
    console.log(req.body);
    var data  = {id: req.body.id};

    // db.connection.connect();
    db.connection.query('DELETE from Workers where id=?;', data.id, function(err, rows, fields) {
        // db.connection.end();
        if (err) throw err;
        console.log('The solution is: ', rows);
        res.send("OK");
    });
});

router.put('/',function(req,res){
    console.log(req.body);
    var data  = [req.body.fname, req.body.lname, parseInt(req.body.id)];

    // db.connection.connect();
    db.connection.query('UPDATE Workers SET `fname` = ?, `lname` = ? where `id` = ?', data, function(err, rows, fields) {
        // db.connection.end();
        if (err) throw err;
        console.log('The solution is: ', rows);
        res.send("OK");
    });
});

module.exports = router;
