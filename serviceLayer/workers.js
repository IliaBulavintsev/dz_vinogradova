"use strict";
var express = require('express');
var router = express.Router();

//import
var WorkerMapper = require('../mapper/worker');
// var CollectionWorkerMapper = require('../mapper/collectionUser');

class WorkerSL {

    constructor(){
        this.mapper = new WorkerMapper.WorkerMapper({});
        // this.collection = new CollectionWorkerMapper.CollectionWorkerMapper({});
    }

    get(){
        return this.collection.get();
    }

    create(fname, lname){
        return this.mapper.create(fname, lname);
    }

    update(fname, lname, id){
        return this.mapper.update(fname, lname, id);
    }

    delete(id){
        return this.mapper.delete(id);
    }
}

//exports
module.exports.WorkerSL = WorkerSL
