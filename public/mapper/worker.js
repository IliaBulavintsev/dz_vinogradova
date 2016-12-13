"use strict";
var express = require('express');
var router = express.Router();
var db = require('../db');

class WorkerMapper {

    constructor(opt){
        this.id = opt.id || 0
        this.fname = opt.fname || '';
        this.lname = opt.lname || '';
    }

    get(){

    }

    update(){

    }

    delete(id){
        db.connection.query('DELETE from Workers where id=?', id, function(err, rows, fields) {
            if (err) throw err;
            console.log('The solution is: ', rows);
            return true;
        });
        return false;
    }
}

//exports
module.export.WorkerMapper
