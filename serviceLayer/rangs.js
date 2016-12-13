"use strict";
var express = require('express');
var router = express.Router();

//import
var RangMapper = require('../mapper/rang');
// var CollectionWorkerMapper = require('../mapper/collectionUser');

class RangSL {

    constructor(){
        this.mapper = new RangMapper.RangMapper({});
        // this.collection = new CollectionWorkerMapper.CollectionWorkerMapper({});
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

    delete(id){
        return this.mapper.delete(id);
    }
}

//exports
module.exports.RangSL = RangSL
