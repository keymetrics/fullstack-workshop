
var pmx = require('pmx');

var fibonacci  = require('./lib/fibonacci.js');
var memoryleak = require('./lib/memoryleak.js');

pmx.action('fibonacci', function(reply) {
  for (var i = 0; i < 19999999; i++) {
    fibonacci(77, true);
  }

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
