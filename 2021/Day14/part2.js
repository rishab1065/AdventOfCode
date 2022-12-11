const fs = require('fs');
const input = fs
  .readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' })
  .trim()
  .split('\n');

const map = {};

input.forEach((line) => {
  const part1 = line.split('->')[0].trim();
  map[part1] = line.split('->')[1].trim();
});

// console.log(map, 'input');
let steps = 40;
let line = 'VOKKVSKKPSBVOOKVCFOV';

let countMap = {};
for (let i = 0; i < line.length - 1; i++) {
  if (!countMap[`${line[i]}${line[i + 1]}`]) {
    countMap[`${line[i]}${line[i + 1]}`] = 0;
  }
  countMap[`${line[i]}${line[i + 1]}`] += 1;
}
// console.log(countMap, 'countMap');
let newCountMap = {};
while (steps--) {
  Object.keys(countMap).forEach((pair) => {
    if (map[pair]) {
      if (!newCountMap[`${pair[0]}${map[pair]}`])
        newCountMap[`${pair[0]}${map[pair]}`] = 0;

      newCountMap[`${pair[0]}${map[pair]}`] += countMap[pair];

      if (!newCountMap[`${map[pair]}${pair[1]}`])
        newCountMap[`${map[pair]}${pair[1]}`] = 0;

      newCountMap[`${map[pair]}${pair[1]}`] += countMap[pair];
    }
  });
  // console.log(newCountMap, 'newCountMap');
  // console.log(steps);
  countMap = newCountMap;
  newCountMap = {};
}
// console.log(line.length);
let count = {};
Object.keys(countMap).forEach((ele) => {
  if (!count[ele[0]]) {
    count[ele[0]] = 0;
  }
  count[ele[0]] += countMap[ele];
  // if (!count[ele[1]]) {
  // 	count[ele[1]] = 0;
  // }
  // count[ele[1]] += countMap[ele];
});
count[line[line.length - 1]]++;
// console.log(count);
var min = Number.MAX_SAFE_INTEGER;
var max = Number.MIN_SAFE_INTEGER;
for (var k in count) {
  // console.log(k);

  if (max < count[k]) {
    max = count[k];
  }
  if (min > count[k]) {
    min = count[k];
  }
}
console.log(max - min);
