let input = require('./input');
let sampleInput2 = require('./sampleInput');

let sampleInput = ['noop', 'addx 3', 'addx -5'];

// input = sampleInput2;

let totalCycle = 0;
let X = 1;
let totalSignalStrength = 0;

const cycleToRecord = [20, 60, 100, 140, 180, 220];

for (let i = 0; i < input.length; i++) {
  const signal = input[i].split(' ')[0];
  const count = parseInt(input[i].split(' ')[1]);

  if (signal === 'noop') {
    totalCycle = totalCycle + 1;
    if (cycleToRecord.includes(totalCycle)) {
      totalSignalStrength += totalCycle * X;
      console.log(totalCycle * X, totalCycle, X, 'totalCycle 1');
    }
  } else {
    if (!isNaN(count)) {
      totalCycle = totalCycle + 1;

      if (cycleToRecord.includes(totalCycle)) {
        totalSignalStrength += totalCycle * X;
        console.log(totalCycle * X, totalCycle, X, 'totalCycle 2');
      }

      totalCycle = totalCycle + 1;

      if (cycleToRecord.includes(totalCycle)) {
        totalSignalStrength += totalCycle * X;
        console.log(totalCycle * X, totalCycle, X, 'totalCycle 3');
      }
      X = X + count;
    }
  }
}

console.log(totalCycle, X, totalSignalStrength);
