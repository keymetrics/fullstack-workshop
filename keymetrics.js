
var pmx = require('pmx');

var fibonacci  = require('./lib/fibonacci.js');
var memoryleak = require('./lib/memoryleak.js');

pmx.action('fibonacci', function(reply) {
  for (var i = 0; i < 59999999; i++) {
    fibonacci(77, true);
  }

  reply({success: true});
});

pmx.action('memleak', function(reply) {
  memoryleak({interval: 50, max_size: 5e8}, function() {
    reply({success: true});
  });
});

pmx.action('error', function(reply) {
  throw new Error('This is an error');
  reply({success: true});
});

pmx.action('env', function(reply) {
  reply(process.env);
});

pmx.action('logs', function(reply) {
  var stop = setInterval(function() {
    console.log('Out log');
  }, 1000);
  reply({ success : true });
});

pmx.action('modules', function(reply) {
  reply(process.versions);
});
