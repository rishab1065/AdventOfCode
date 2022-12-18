const fs = require('fs');
let input = fs
  // .readFileSync('./sampleInput.txt', { encoding: 'utf8', flag: 'r' })
  .readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' })
  .trim()
  .split('\n');

const cube = [
  [0, 1],
  [1, 0],
  [0, 2],
  [2, 0],
  [1, 2],
  [2, 1],
];

// all sides
let sides = input.length * 6;

for (let i = 0; i < input.length; i++) {
  const [x, y, z] = input[i].split(',').map((x) => parseInt(x));

  // overlapping sides
  if (input.includes(`${x + 1},${y},${z}`)) {
    sides--;
  }
  if (input.includes(`${x - 1},${y},${z}`)) {
    sides--;
  }
  if (input.includes(`${x},${y + 1},${z}`)) {
    sides--;
  }
  if (input.includes(`${x},${y - 1},${z}`)) {
    sides--;
  }
  if (input.includes(`${x},${y},${z + 1}`)) {
    sides--;
  }
  if (input.includes(`${x},${y},${z - 1}`)) {
    sides--;
  }
}

console.log(sides, 'input');
