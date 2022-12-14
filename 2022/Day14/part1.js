const fs = require('fs');
let input = fs
  .readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' })
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

function settleSand() {
  let sandX = 500;
  let sandY = 0;

  let isSettled = false;

  while (grid.x2 >= sandX && grid.y2 >= sandY) {
    if (!rocks[`${sandX},${sandY + 1}`]) {
      sandY++;
    } else if (!rocks[`${sandX - 1},${sandY + 1}`]) {
      sandX--;
      sandY++;
    } else if (!rocks[`${sandX + 1},${sandY + 1}`]) {
      sandX++;
      sandY++;
    } else {
      rocks[`${sandX},${sandY}`] = true;
      isSettled = true;
      break;
    }
  }

  return isSettled;
}

let sand = 0;
while (settleSand()) {
  sand++;
}

console.log(sand, 'settleSand');
