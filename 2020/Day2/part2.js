const input = require('./input');

const sampleInput = [1721, 979, 366, 299, 675, 1456];

// input = sampleInput;

for (var i = 0; i < input.length; i++) {
  var num1 = input[i];
  var sum = 2020 - num1;

  for (var j = 1; j < input.length; j++) {
    var num2 = input[j];
    if (input.includes(sum - num2)) {
      console.log(num1 * num2 * (sum - num2));
      break;
    }
  }
}
