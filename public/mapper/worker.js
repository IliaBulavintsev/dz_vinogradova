"use strict";
var express = require('express');

class WorkerMapper() {

    constructor(opt){
        this.id = opt.id || 0
        this.fname = opt.fname || '';
        this.lname = opt.lname || '';
    }
}
