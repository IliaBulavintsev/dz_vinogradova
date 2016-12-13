"use strict";
var express = require('express');
var router = express.Router();
var db = require('./db');

//import
var RangSL = require('./serviceLayer/rangs');

router.get('/',function(req,res){
    db.connection.query('SELECT * FROM Rangs;', function(err, rows, fields) {
        if (err) throw err;
        // console.log('The solution is: ', rows);
        res.send(rows);
    });

});

router.post('/',function(req,res){

    var data  = {rang: req.body.rang_name};
    let rang = new RangSL.RangSL();
    let result = rang.create(data);
    result ? res.send("OK") : res.send("BAD");

});

router.delete('/',function(req,res){

    var data  = req.body.id;
    let rang = new RangSL.RangSL();
    let result = rang.delete(data);
    result ? res.send("OK") : res.send("BAD");

});

router.put('/',function(req,res){

    var data  = [req.body.rang_name, parseInt(req.body.id)];
    let rang = new RangSL.RangSL();
    let result = rang.update(data);
    result ? res.send("OK") : res.send("BAD");

});

module.exports = router;
