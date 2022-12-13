const input = require('./input');

const sampleInput = [1721, 979, 366, 299, 675, 1456];

// input = sampleInput;

for (var i = 0; i < input.length; i++) {
  var num1 = input[i];

  if (input.includes(2020 - input[i])) {
    var num2 = 2020 - input[i];
    break;
  }
}

console.log(num1 * num2);
