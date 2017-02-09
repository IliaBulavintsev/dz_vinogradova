"use strict";
var express = require('express');
var router = express.Router();
var db = require('../db');
var async = require('async');

class PlanMapper {

    constructor(opt){
        this.id = opt.id || 0;
        this.w_id = opt.w_id || 0;
        this.from = opt.from || 0;
        this.to = opt.to || 0;
    }

    get(){

    }

    create(day, w_id, from, to){
        db.connection.query(`INSERT INTO ${day} (w_id, from, to) values ?;`, [w_id, from, to], function(err, rows, fields) {

        });
        return false;
    }

    update(day, from, to, id){
        db.connection.query(`UPDATE ${day} SET ? where id = ?`,[{from: from, to: to}, id], function(err, rows, fields) {
            if (err) {return false;}
            return true;
        });
        // return false;
    }

    delete(id, table){
        var t = table.toUpperCase();
        console.log(t,id);
        db.connection.query(`DELETE from ${t} where id=? ;`, [id], function(err, rows, fields) {
            if (err) {return false;}
            return true;
        });
        // return false;
    }
}

//exports
module.exports.PlanMapper = PlanMapper;
