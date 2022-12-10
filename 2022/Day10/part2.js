let input = require('./input');
let sampleInput2 = require('./sampleInput');

let sampleInput = ['noop', 'addx 3', 'addx -5'];

// input = sampleInput2;

let totalCycle = 1;
let X = 1;
// let spriteStartPosition = X - 1;
let CRTPosition = 0;

let image = new Array(6).fill().map(() => new Array(40).fill(' '));

const cycleToRecord = [1, 41, 81, 121, 161, 201];
let currentRow = -1;

for (let i = 0; i < input.length; i++) {
  const signal = input[i].split(' ')[0];
  const count = parseInt(input[i].split(' ')[1]);

  const spritePos = [X - 1, X, X + 1];

  if (signal === 'noop') {
    if (cycleToRecord.includes(totalCycle)) {
      CRTPosition = CRTPosition % 40;
      currentRow++;
    }
    // console.log({ spritePos, CRTPosition, totalCycle }, 'CRTPosition 11');
    if (spritePos.includes(CRTPosition)) {
      // console.log(currentRow, CRTPosition, 'CRTPositionCRTPosition');
      image[currentRow][CRTPosition] = '#';
    }
    CRTPosition = CRTPosition + 1;
    totalCycle = totalCycle + 1;
  } else {
    if (!isNaN(count)) {
      if (cycleToRecord.includes(totalCycle)) {
        CRTPosition = CRTPosition % 40;
        currentRow++;
      }
      // console.log({ spritePos, CRTPosition, totalCycle }, 'CRTPosition 22');
      if (spritePos.includes(CRTPosition)) {
        // console.log(currentRow, CRTPosition, 'CRTPositionCRTPosition');
        image[currentRow][CRTPosition] = '#';
      }

      CRTPosition = CRTPosition + 1;
      totalCycle = totalCycle + 1;

      if (cycleToRecord.includes(totalCycle)) {
        CRTPosition = CRTPosition % 40;
        currentRow++;
      }
      // console.log(
      //   { spritePos, CRTPosition, totalCycle, currentRow },
      //   'CRTPosition 33'
      // );
      if (spritePos.includes(CRTPosition)) {
        // console.log(currentRow, CRTPosition, 'CRTPositionCRTPosition');
        image[currentRow][CRTPosition] = '#';
      }

      CRTPosition = CRTPosition + 1;
      totalCycle = totalCycle + 1;

      X = X + count;
    }
  }
}

for (let j = 0; j < image.length; j++) {
  console.log(image[j].join(''));
}
