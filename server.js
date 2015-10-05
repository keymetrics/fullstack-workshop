'use strict';
var express = require('express')
var pusage = require('pidusage')
var bodyParser = require('body-parser')
var timeout = require('connect-timeout')
var fibonacci = require('./fibonacci.js')
var memoryleak = require('./memoryleak.js')
var isNumber = require('is-number')

var app = express()

// Fibonacci
const RANDOM_MIN = 1
const RANDOM_MAX = 156 //78 iterations until Number.MAX_SAFE_INTEGER

const HTTP_TIMEOUT = 2000 //ms

const MEM_MAX = 5 * Math.pow(10, 8) //~500mb, default 

app
.use(bodyParser.json())
.get('/', function(req, res, next) {
  console.log('Hello World')
  return res.status(200).send('Hello World')
})

.get('/fibonacci', function(req, res, next) {
  let rand = parseInt(req.query.iterations)

  if(!isNumber(rand)) {
    rand = Math.floor(Math.random() * (RANDOM_MAX - RANDOM_MIN + 1)) + RANDOM_MIN
  }

  let f = fibonacci(rand, req.query.force || false)

  if(f === null) {
    return res.status(500).send({error: 'Number exceed the limit'}) 
  }

  return res.status(200).send({fibonacci: { iterations: rand, result: f }})
})

.get('/timeout', timeout(HTTP_TIMEOUT), function(req, res, next) {
  return setTimeout(function() {
    if(req.timedout) { return }

    return res.status(200).end()
  }, req.query.timeout || HTTP_TIMEOUT)
})

.get('/memoryleak', function(req, res, next) {
  memoryleak({interval: req.query.interval || 400, max_size: MEM_MAX}, function() {
    return next(new Error('Memory size exceded'))
  })
})

.use(function(err, req, res, next) {
  if(err) {
    console.error(err.stack)

    if(req.timedout) {
      res.status(408)
    } else {
      res.status(500)
    }

    return res.send({error: err.message})
  }

  return next()
})

.use(function(req, res, next) {
  return res.status(404).send({error: 'Not found'})
})

app.listen(3200)
