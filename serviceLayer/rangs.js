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

    create(rang){
        return this.mapper.create(rang);
    }

    update(rang, id){
        return this.mapper.update(rang, id);
    }

    delete(id){
        return this.mapper.delete(id);
    }
}

//exports
module.exports.RangSL = RangSL
