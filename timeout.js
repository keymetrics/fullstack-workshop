'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var timeout = require('connect-timeout');

var app = express();
app.post('/save', timeout('2s'), bodyParser.json(), haltOnTimedout, function(req, res, next){
  savePost(req.body, function(err, id){
    if (err) return next(err);
    if (req.timedout) return;
    res.send('saved as id ' + id);
  });
});

function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
}

function savePost(post, cb){

  var fibonacci = require('./utils.js').fibonacci

  try {
    let f = fibonacci(100000000000)
  } catch(e) {
    console.error(e.stack) 
  }

  return cb(f)
}

app.listen(3000);
