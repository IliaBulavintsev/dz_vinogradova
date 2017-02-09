"use strict";
var express = require('express');
var router = express.Router();

//import
var PlanMapper = require('../mapper/plan');

class PlanSL {

    constructor(){
        this.mapper = new PlanMapper.PlanMapper({});
    }

    get(){
        // return this.collection.get();
    }

    create(day, w_id, from, to){
        return this.mapper.create(day, w_id, from, to);
    }

    update(day, data){
        return this.mapper.update(day, from, to, id);
    }

    delete(id, table){
        return this.mapper.delete(id, table);
    }
}

//exports
module.exports.PlanSL = PlanSL
