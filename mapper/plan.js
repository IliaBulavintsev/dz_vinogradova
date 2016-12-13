"use strict";
var express = require('express');
var router = express.Router();
var db = require('../db');

class PlanMapper {

    constructor(opt){
        this.id = opt.id || 0;
        this.w_id = opt.w_id || 0;
        this.from = opt.from || 0;
        this.to = opt.to || 0;
    }

    get(){

    }

    create(data){
        // db.connection.query('INSERT INTO Rangs SET ?;', data, function(err, rows, fields) {
        //     if (err) throw err;
        //     return true;
        // });
        // return false;
    }

    update(data){
        // db.connection.query('UPDATE Rangs SET `rang` = ? where `id` = ?', data, function(err, rows, fields) {
        //     if (err) throw err;
        //     return true;
        // });
        // return false;
    }

    delete(id, table){
        var t = table.toUpperCase();
        console.log(t,id);
        db.connection.query(`DELETE from ${t} where id=? ;`, [id], function(err, rows, fields) {
            if (err) throw err;
            return true;
        });
        return false;
    }
}

//exports
module.exports.PlanMapper = PlanMapper;
