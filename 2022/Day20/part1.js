const fs = require('fs');
let input = fs
  .readFileSync('./sampleInput.txt', { encoding: 'utf8', flag: 'r' })
  // .readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' })
  .trim()
  .split('\n');

input = input.map((num, index) => ({
  num: parseInt(num),
  index,
  isMoved: false,
}));

for (let signal of input) {
  const { index, isMoved, num } = signal;

  if (isMoved) {
    continue;
  }

  updatePosition(index + num, signal);
  signal.index = index + num;

  signal.isMoved = true;
  break;
}

console.log(input, 'newPosition');

function updatePosition(newPosition, currentSignal) {
  currentSignal.index = newPosition;
  for (let signal of input) {
    const { index } = signal;

    if (index > newPosition) {
      continue;
    }

    signal.index--;
  }
}
