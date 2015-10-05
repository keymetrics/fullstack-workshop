'use strict';
module.exports = function fibonacci(max, force) {
  let x = -1;
  let i = 0;
  let j = 1;
  let k = 0;

  for(; k < max; i = j, j = x, k++)  {
    
    if(x > Number.MAX_SAFE_INTEGER && !force) {
      console.error('Fibonacci stopeed at iteration %d', k);
      return null 
    }

    x = i + j 
  }

  return x
}
