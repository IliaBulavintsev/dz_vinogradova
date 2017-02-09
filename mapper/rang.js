"use strict";
var express = require('express');
var router = express.Router();
var db = require('../db');

class RangMapper {

    constructor(opt){
        this.id = opt.id || 0;
        this.rang = opt.rang || '';
    }

    get(){

    }

    create(rang){
        db.connection.query('INSERT INTO Rangs SET ?;', [rang], function(err, rows, fields) {
            if (err) throw err;
            return true;
        });
        return false;
    }

    update(rang, id){
        db.connection.query('UPDATE Rangs SET `rang` = ? where `id` = ?', [rang, id], function(err, rows, fields) {
            if (err) throw err;
            return true;
        });
        return false;
    }

    delete(id){
        db.connection.query('DELETE from Rangs where id=?;', id, function(err, rows, fields) {
            if (err) throw err;
            return true;
        });
        return false;
    }
}

//exports
module.exports.RangMapper = RangMapper;
