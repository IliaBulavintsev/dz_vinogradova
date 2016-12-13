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

    create(data){
        db.connection.query('INSERT INTO Workers SET ?;', data, function(err, rows, fields) {
            if (err) throw err;
            return true;
        });
        return false;
    }

    update(data){
        db.connection.query('UPDATE Workers SET `fname` = ?, `lname` = ? where `id` = ?', data, function(err, rows, fields) {
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
