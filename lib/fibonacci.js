
module.exports = function fibonacci(max, force) {
  var x = -1;
  var i = 0;
  var j = 1;
  var k = 0;

  for (; k < max; i = j, j = x, k++) {

    if (x > Number.MAX_SAFE_INTEGER && !force) {
      console.error('Fibonacci stopeed at iteration %d', k);
      return {
        number     : x,
        iterations : k,
        error      : 'Number exceed the limit ('+Number.MAX_SAFE_INTEGER+')'
      };
    }

    x = i + j;
  }

  return {
    number     : x,
    iterations : k
  };
};
