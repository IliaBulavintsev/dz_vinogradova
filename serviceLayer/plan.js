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

    create(data){
        return this.mapper.create(data);
    }

    update(data){
        return this.mapper.update(data);
    }

    delete(id, table){
        return this.mapper.delete(id, table);
    }
}

//exports
module.exports.PlanSL = PlanSL
