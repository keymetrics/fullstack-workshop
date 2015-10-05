'use strict';
module.exports = function memoryleak(options, callback) {

  var time = options.interval || 400
  var max = options.max_size * 10 || (5 * Math.pow(10, 9)) //~500mb 
  var size = 0 //number of iterations
  var big_memory_leak = []

  var stress = function(cb) {

    var j = 100000, arr = []

    size += j * 500

    while(j--) {
        //wc -c => 500 
        arr[j] = {lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non odio venenatis, pretium ligula nec, fringilla ipsum. Sed a erat et sem blandit dignissim. Pellentesque sollicitudin felis eu mattis porta. Nullam nec nibh nisl. Phasellus convallis vulputate massa vitae fringilla. Etiam facilisis lectus in odio lacinia rutrum. Praesent facilisis vitae urna a suscipit. Aenean lacinia blandit lorem, et ullamcorper metus sagittis faucibus. Nam porta eros nisi, at adipiscing quam varius eulfak.'}

    }

    big_memory_leak.push(arr)

    if(size > max)
      return cb(true)
    else
      return cb(false)
  }

  var interval = function() {
    return setTimeout(function() {

      stress(function(stop) {
        if(stop)
          return callback(size)
        else
          return interval()
      })

    }, time)
  }

  interval()
}
