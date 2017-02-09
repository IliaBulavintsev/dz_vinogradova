"use strict";
var express = require('express');
var router = express.Router();
var db = require('./db');
var async = require('async');
var mysql      = require('mysql');
var credentials = {
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'tp',
    password        : 'password',
    database        : 'dz'
    };

//import
var PlanSL = require('./serviceLayer/plan');

router.post('/',function(req,res){

    var day = req.body.d;
    // var data = {w_id: parseInt(req.body.w), from: req.body.from, to:req.body.to};

    let plan = new PlanSL.PlanSL();
    let result = plan.create(req.body.d, parseInt(req.body.w), req.body.from, req.body.to);
    console.log(result);
    result ? res.send("OK") : res.send("BAD");

});

router.put('/',function(req,res){

    var day = req.body.d.toUpperCase();
    // var data = [ u_data, parseInt(req.body.id)] ;

    let plan = new PlanSL.PlanSL();
    let result = plan.update(day, parseFloat(req.body.from), parseFloat(req.body.to), parseInt(req.body.id));
    result ? res.send("OK") : res.send("BAD");

});

router.delete('/',function(req,res){

    var id = parseInt(req.body.id);
    var table = req.body.table;
    let plan = new PlanSL.PlanSL();
    let result = plan.delete(id, table);
    result ? res.send("OK") : res.send("BAD");

});

router.get('/',function(req,res){
        var pool = mysql.createPool(credentials);
        var query1 = 'select d.id, w.fname, w.lname, `from`, `to` from M as d join Workers as w on d.w_id=w.id;'
        var query2 = 'select d.id, w.fname, w.lname, `from`, `to` from T as d join Workers as w on d.w_id=w.id;'
        var query3 = 'select d.id, w.fname, w.lname, `from`, `to` from W as d join Workers as w on d.w_id=w.id;'
        var query4 = 'select d.id, w.fname, w.lname, `from`, `to` from TH as d join Workers as w on d.w_id=w.id;'
        var query5 = 'select d.id, w.fname, w.lname, `from`, `to` from F as d join Workers as w on d.w_id=w.id;'
        var query6 = 'select * from Workers;'


        var return_data = {};

        async.parallel([
           function(parallel_done) {
               pool.query(query1, {}, function(err, results) {
                   if (err) return parallel_done(err);
                   return_data['m'] = results;
                   parallel_done();
               });
           },
           function(parallel_done) {
               pool.query(query2, {}, function(err, results) {
                   if (err) return parallel_done(err);
                   return_data['t'] = results;
                   parallel_done();
               });
           },
           function(parallel_done) {
               pool.query(query3, {}, function(err, results) {
                   if (err) return parallel_done(err);
                   return_data['w'] = results;
                   parallel_done();
               });
           },
           function(parallel_done) {
               pool.query(query4, {}, function(err, results) {
                   if (err) return parallel_done(err);
                   return_data['th'] = results;
                   parallel_done();
               });
           },
           function(parallel_done) {
               pool.query(query5, {}, function(err, results) {
                   if (err) return parallel_done(err);
                   return_data['f'] = results;
                   parallel_done();
               });
           },
           function(parallel_done) {
               pool.query(query6, {}, function(err, results) {
                   if (err) return parallel_done(err);
                   return_data['workers'] = results;
                   parallel_done();
               });
           },

        ], function(err) {
             if (err) console.log(err);
             pool.end();
             console.log(return_data);
            //  return return_data;
             res.send(return_data);
        });
});

module.exports = router;
