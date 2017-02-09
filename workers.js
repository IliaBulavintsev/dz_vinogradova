"use strict";
var express = require('express');
var router = express.Router();
var db = require('./db');

var getWorkerCollection = require('./mapper/collectionUser');

//import
var WorkerSL = require('./serviceLayer/workers');

router.post('/',function(req,res){
    console.log(req.body);

    var data  = {fname: req.body.fname, lname: req.body.lname};
    let worker = new WorkerSL.WorkerSL();
    let result = worker.create(req.body.fname, req.body.lname);
    result ? res.send("OK") : res.send("BAD");
});

router.delete('/',function(req,res){
    console.log(req.body.id);

    let worker = new WorkerSL.WorkerSL();
    let result = worker.delete(req.body.id);
    result ? res.send("OK") : res.send("BAD");
});

router.put('/',function(req,res){
    console.log(req.body);
    var data  = [req.body.fname, req.body.lname, parseInt(req.body.id)];

    let worker = new WorkerSL.WorkerSL();
    let result = worker.update(req.body.fname, req.body.lname, parseInt(req.body.id));
    result ? res.send("OK") : res.send("BAD");
});

router.get('/', function(req,res){
    db.connection.query('SELECT * FROM Workers;', function(err, rows, fields) {
        var result = {};
        if (err) throw err;
        result['workers'] = rows;
        db.connection.query('select w.id, w.w_id, w.r_id, w.hours, r.rang from WRH as w join Rangs as r on w.r_id = r.id;', function(err, rows, fields) {
            if (err) throw err;
            for (var i=0; i < rows.length; ++i){
                if (result[rows[i].w_id]){
                    result[rows[i].w_id].push(rows[i]);
                } else {
                    result[rows[i].w_id] = [];
                    result[rows[i].w_id].push(rows[i]);
                }
            }
            res.send(result);

        });
    });
    // let worker = new WorkerSL.WorkerSL();
    // let result =
    // res.send(worker.get());
    // console.log('+++++++++++++++11\n',result,'+++++++++++++++11\n');
    // res.send(result);

});

//exports
module.exports = router;
