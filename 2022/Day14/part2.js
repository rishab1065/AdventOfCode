const fs = require('fs');
let input = fs
  .readFileSync('./sampleInput.txt', { encoding: 'utf8', flag: 'r' })
  .trim()
  .split('\n');

// console.log(input);

const rocks = {};
const grid = {
  x1: Number.MAX_SAFE_INTEGER,
  x2: Number.MIN_SAFE_INTEGER,
  y1: Number.MAX_SAFE_INTEGER,
  y2: Number.MIN_SAFE_INTEGER,
};

for (let i = 0; i < input.length; i++) {
  let ptr = 0;
  const path = input[i].split('->');

  while (ptr < path.length - 1) {
    let [startRock1X, startRock1Y] = path[ptr]
      .split(',')
      .map((num) => parseInt(num));
    let [startRock2X, startRock2Y] = path[ptr + 1]
      .split(',')
      .map((num) => parseInt(num));

    grid.x1 = Math.min(startRock1X, startRock2X, grid.x1);
    grid.x2 = Math.max(startRock1X, startRock2X, grid.x2);

    grid.y1 = Math.min(startRock1Y, startRock2Y, grid.y1);
    grid.y2 = Math.max(startRock1Y, startRock2Y, grid.y2);

    let itr = 0;
    let X = true;
    let limit = Math.abs(startRock1X - startRock2X);

    if (startRock1X === startRock2X) {
      X = false;
      limit = Math.abs(startRock1Y - startRock2Y);
    }

    while (itr <= limit) {
      if (X) {
        rocks[
          `${Math.min(startRock1X, startRock2X) + itr},${startRock1Y}`
        ] = true;
      } else {
        rocks[
          `${startRock1X},${Math.min(startRock1Y, startRock2Y) + itr}`
        ] = true;
      }
      itr++;
    }

    ptr++;
  }
}

grid.y2 = grid.y2 + 1;

// console.log(grid);

function settleSand() {
  let sandX = 500;
  let sandY = 0;

  //   console.log('---------------');
  while (grid.y2 >= sandY) {
    // console.log(sandY, sandX, isSettled, grid, '0');
    if (sandY === grid.y2) {
      //   //   console.log(sandY, sandX, isSettled, '4');
      rocks[`${sandX},${sandY}`] = true;
      break;
    } else if (!rocks[`${sandX},${sandY + 1}`]) {
      //   console.log(sandY, sandX, isSettled, '1');
      sandY++;
    } else if (!rocks[`${sandX - 1},${sandY + 1}`]) {
      //   console.log(sandY, sandX, isSettled, '2');
      sandX--;
      sandY++;
    } else if (!rocks[`${sandX + 1},${sandY + 1}`]) {
      //   console.log(sandY, sandX, isSettled, '3');
      sandX++;
      sandY++;
    } else {
      //   console.log(sandY, sandX, isSettled, '5');
      rocks[`${sandX},${sandY}`] = true;
      break;
    }
  }

  return sandX === 500 && sandY === 0 ? false : true;
}

let sand = 0;
while (settleSand()) {
  sand++;
}

console.log(sand + 1, 'settleSand');
