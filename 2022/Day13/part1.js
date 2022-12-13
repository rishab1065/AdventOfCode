const fs = require('fs');
const input = fs
  .readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' })
  .trim()
  .split('\n');

const signals = [];

let currentSignal = [];
input.forEach((line, index) => {
  if (line === '') {
    signals.push(currentSignal);
    currentSignal = [];
  } else {
    const signal = JSON.parse(line);

    currentSignal.push(signal);
  }
  if (input.length - 1 === index) {
    signals.push(currentSignal);
  }
});

const cmp = (left, right) => {
  let i = 0;
  while (i < left.length && i < right.length) {
    if (Number.isInteger(left[i]) && Number.isInteger(right[i])) {
      if (left[i] == right[i]) {
        i++;
      } else {
        return left[i] - right[i];
      }
    } else {
      const recRes = cmp([left[i]].flat(), [right[i]].flat());
      if (recRes == 0) {
        i++;
      } else {
        return recRes;
      }
    }
  }
  return left.length - right.length;
};

let sum = 0;

for (let s = 0; s < signals.length; s++) {
  const result = cmp(signals[s][0], signals[s][1], 0);
  if (result < 0) {
    sum += s + 1;
    console.log(result, s + 1);
  }
}

console.log(sum);
