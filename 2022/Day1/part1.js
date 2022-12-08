const input = require('./input');

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

let totalCalorie = 0;
let maxCalorie = -1;
for (var i = 0; i < input.length; i++) {
  const currentCalorie = input[i];
  if (currentCalorie !== '') {
    totalCalorie += currentCalorie;
  } else {
    if (maxCalorie <= totalCalorie) {
      maxCalorie = totalCalorie;
    }
    totalCalorie = 0;
  }
}
console.log(maxCalorie);
