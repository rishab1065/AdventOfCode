const fs = require('fs');
const { join } = require('path');
let input = fs
  .readFileSync('./sampleInput.txt', { encoding: 'utf8', flag: 'r' })
  // .readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' })
  .trim()
  .split('');

const MAX_FLOOR = 10000;

const movement = {
  '<': { dx: 0, dy: -1 },
  '>': { dx: 0, dy: 1 },
};

const rocks = [
  {
    height: 1,
    width: 4,
    pos: [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],
  },
  {
    height: 3,
    width: 3,
    pos: [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 1],
    ],
  },
  {
    height: 2,
    width: 2,
    pos: [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 2],
      [2, 2],
    ],
  },
  {
    height: 3,
    width: 3,
    pos: [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ],
  },
  {
    height: 4,
    width: 1,
    pos: [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
  },
];

// console.log(input, 'input');

let currentAirPressureIndex = 0;

let rocksStopped = 0;

let rocksPosMap = {};

let rockMap = new Array(MAX_FLOOR).fill().map(() => new Array(7).fill('.'));

let floor = 0;
let maxHeight = 0;
let currentRockPos = updateRockPos(rocks[0].pos, floor + 3, 2);

// console.log(currentRockPos, 'currentRockPos');
while (rocksStopped < 2022) {
  const currentAirPressure = input[currentAirPressureIndex % input.length];
  let isRockStoppedV = false;

  if (
    canRockMove(
      currentRockPos,
      rocksPosMap,
      movement[currentAirPressure].dx,
      movement[currentAirPressure].dy
    )
  ) {
    // left or right
    currentRockPos = updateRockPos(
      currentRockPos,
      movement[currentAirPressure].dx,
      movement[currentAirPressure].dy
    );
    // if (movement[currentAirPressure].dy === 1) {
    //   console.log(currentRockPos, 'currentRockPos right');
    // } else {
    //   console.log(currentRockPos, 'currentRockPos left');
    // }
  } else {
    // console.log('not moving left or right');
  }

  if (canRockMove(currentRockPos, rocksPosMap, -1, 0)) {
    // down
    currentRockPos = updateRockPos(currentRockPos, -1, 0);
    // console.log(currentRockPos, 'currentRockPos down');
    //   //   rockDepth++;
    isRockStoppedV = false;
  } else {
    // console.log('not moving down');
    isRockStoppedV = true;
  }

  // rocksStopped++;
  // console.log(isRockStoppedV, 'isRockStopped');
  currentAirPressureIndex++;
  if (isRockStoppedV) {
    // console.log(currentRockPos, 'currentRockPos');
    for (let [x, y] of currentRockPos) {
      rockMap[x][y] = '#';
      rocksPosMap[`${x},${y}`] = true;
    }
    rocksStopped++;
    floor = currentRockPos.reduce((maxX, [x]) => Math.max(maxX, x), floor) + 1;

    isRockStoppedV = false;
    // nextRockPos
    currentRockPos = updateRockPos(rocks[rocksStopped % 5].pos, floor + 3, 2);
    console.log({ floor });
  }
}

// console.log('object');

function canRockMove(rockPos, rocksPosMap, dx, dy) {
  const newPos = updateRockPos(rockPos, dx, dy);
  const [minX, minY, maxY] = newPos.reduce(
    ([minX, minY, maxY], pos) => {
      return [
        Math.min(minX, pos[0]),
        Math.min(minY, pos[1]),
        Math.max(maxY, pos[1]),
      ];
    },
    [9, 9, -1]
  );

  // console.log(floor, minX, minY, maxY, 'minX');
  if (minX < 0) {
    return false;
  }

  if (minY < 0 || maxY > 6) {
    // console.log('helloo 1');
    return false;
  }

  for (let [x, y] of newPos) {
    if (rocksPosMap[`${x},${y}`]) {
      // console.log(x, y, 'helloo 2');
      return false;
    }
  }

  return true;
}

function updateRockPos(rockPos, dx, dy) {
  return rockPos.map(([x, y]) => [x + dx, y + dy]);
}

rockMap = rockMap.reverse();
for (let x = 0; x < rockMap.length; x++) {
  console.log(rockMap[x].join('') + ' ' + (MAX_FLOOR - x - 1));
}

// console.log({ rocksPosMap });
// console.log({ floor });
