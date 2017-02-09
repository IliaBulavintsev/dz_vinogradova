"use strict";
var express = require('express');
var router = express.Router();
var db = require('../db');

class WorkerMapper {

    constructor(opt){
        this.id = opt.id || 0;
        this.fname = opt.fname || '';
        this.lname = opt.lname || '';
    }

    get(){

    }

    create(fname, lname){
        db.connection.query('INSERT INTO Workers SET `fname` = ?, `lname` = ? ;', [fname, lname], function(err, rows, fields) {
            if (err) throw err;
            return true;
        });
        return false;
    }

    update(fname, lname, id){
        db.connection.query('UPDATE Workers SET `fname` = ?, `lname` = ? where `id` = ?', [fname, lname, id], function(err, rows, fields) {
            if (err) throw err;
            return true;
        });
        return false;
    }

    delete(id){
        db.connection.query('DELETE from Workers where id=?', id, function(err, rows, fields) {
            if (err) throw err;
            return true;
        });
        return false;
    }
}

//exports
module.exports.WorkerMapper = WorkerMapper;
