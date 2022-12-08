let input = require('./input');

const sampleInput = [
  1000,
  2000,
  3000,
  '',
  4000,
  '',
  5000,
  6000,
  '',
  7000,
  8000,
  9000,
  '',
  10000,
];

// input = sampleInput;

let totalCalorie = 0;
let calories = [];
for (var i = 0; i < input.length; i++) {
  const currentCalorie = input[i];
  if (currentCalorie !== '') {
    totalCalorie += currentCalorie;
  } else {
    calories.push(totalCalorie);
    totalCalorie = 0;
  }
}
calories.push(totalCalorie);
calories.sort((a, b) => b - a);
console.log(calories[0] + calories[1] + calories[2]);
