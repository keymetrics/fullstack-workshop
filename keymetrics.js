
var pmx = require('pmx');

var fibonacci  = require('./lib/fibonacci.js');
var memoryleak = require('./lib/memoryleak.js');

pmx.action('fibonacci', function(reply) {
  fibonacci(1000000, true);
  reply({success: true});
});

pmx.action('error', function(reply) {
  throw new Error('This is an error');
  reply({success: true});
});

pmx.action('env', function(reply) {
  reply(process.env);
});

pmx.action('modules', function(reply) {
  reply(process.versions);
});
