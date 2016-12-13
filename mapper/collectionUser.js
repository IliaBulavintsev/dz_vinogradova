"use strict";
var express = require('express');
var router = express.Router();
var db = require('../db');
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
var WorkerMapper = require('../mapper/worker');

class CollectionWorkerMapper {

    constructor(opt){
        this.collection = opt.collection || [];
    }

    static get(){
        var pool = mysql.createPool(credentials);
        var query1 = 'SELECT * FROM Workers;'
        var query2 = 'select w.id, w.w_id, w.r_id, w.hours, r.rang from WRH as w join Rangs as r on w.r_id = r.id;'

        var return_data = {};

        async.parallel([
           function(parallel_done) {
               pool.query(query1, {}, function(err, results) {
                   if (err) return parallel_done(err);
                   return_data['workers'] = results;
                   parallel_done();
               });
           },
           function(parallel_done) {
               pool.query(query2, {}, function(err, rows) {
                   if (err) return parallel_done(err);
                   for (var i=0; i < rows.length; ++i){
                       if (return_data[rows[i].w_id]){
                           return_data[rows[i].w_id].push(rows[i]);
                       } else {
                           return_data[rows[i].w_id] = [];
                           return_data[rows[i].w_id].push(rows[i]);
                       }
                   }
                   parallel_done();
               });
           }
        ], function(err) {
             if (err) console.log(err);
             pool.end();
             console.log(return_data);
             return return_data;
            //  res.send(return_data);
        });
    }
}

//exports
module.exports.CollectionWorkerMapper = CollectionWorkerMapper;
