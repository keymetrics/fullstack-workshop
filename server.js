'use strict';
var express = require('express')
var pusage = require('pidusage')
var bodyParser = require('body-parser')
var timeout = require('connect-timeout')
var fibonacci = require('./lib/fibonacci.js')
var memoryleak = require('./lib/memoryleak.js')
var isNumber = require('is-number')

var app = express()

// Fibonacci random fails
const RANDOM_MIN = 1
const RANDOM_MAX = 156 //78 iterations until Number.MAX_SAFE_INTEGER

const HTTP_TIMEOUT = 2000 //ms

const MEM_MAX = 5e8 //~500mb, default 

app
.use(bodyParser.json())

/**
 * @api {get} / Log "Hello World"
 * @apiGroup Api
 * @apiName HelloWorld
 * @apiSuccess {String} data Hello World
 */
.get('/', function(req, res, next) {
  console.log('Hello World')
  return res.status(200).json({data: 'Hello World'})
})

/**
 * @api {get} /fibonacci Fibonacci
 * @apiGroup Api
 * @apiName Fibonacci
 * @apiParam {Number} iterations Number of iterations
 * @apiParam {Boolean} [force=true] Don't quit if number > Number.MAX_SAFE_INTEGER
 * @apiSuccess {Object} data 
 * @apiSuccess {Number} data.iterations Iterations done
 * @apiSuccess {Number} data.number Resulting number 
 * @apiError (Error 500) error Number exceed the limit (9007199254740991)
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Error
 *     {
 *       "error": "Number exceed the limit (9007199254740991)",
 *       "data": {
 *         "iterations": 78,
 *         "number": 14472334024676220
 *       }
 *     }
 * }
 */
.get('/fibonacci', function(req, res, next) {
  let rand = parseInt(req.query.iterations)

  if(!isNumber(rand)) {
    rand = Math.floor(Math.random() * (RANDOM_MAX - RANDOM_MIN + 1)) + RANDOM_MIN
  }

  let f = fibonacci(rand, req.query.force || false)
  let response = {data: {}}

  if(f.error !== undefined) {
    response.error = f.error
    res.status(500) 
  } else {
    res.status(200)
  }

  response.data.iterations = f.iterations
  response.data.number = f.number

  return res.json(response)
})

/**
 * @api {get} /timeout Timeout
 * @apiGroup Api
 * @apiName Timeout
 * @apiParam {Number} timeout Timeout in ms
 * @apiSuccess {Object} data 
 * @apiSuccess {boolean} data.timeout
 * @apiError (Error 408) error Response timeout
 */
.get('/timeout', timeout(HTTP_TIMEOUT), function(req, res, next) {
  return setTimeout(function() {
    if(req.timedout) { return }

    return res.status(200).json({data: {timeout: false}})
  }, req.query.timeout || HTTP_TIMEOUT)
})

/**
 * @api {get} /memoryleak Memory Leak
 * @apiGroup Api
 * @apiName MemoryLeak
 * @apiParam {Number} [interval=400] Stress interval in ms
 * @apiError (Error 500) error Memory size exceded
 */
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

app.listen(3200, function() {
  console.log('Listening on 3200')
})
