const fs = require('fs');
let input = fs
  // .readFileSync('./sampleInput.txt', { encoding: 'utf8', flag: 'r' })
  .readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' })
  .trim()
  .split('\n');

let map = {};

for (const line of input) {
  const nums = line.split(' ');
  console.log(nums, 'nums');

  if (nums.length === 2) {
    map[nums[0].replace(':', '')] = parseInt(nums[1]);
  } else {
    map[nums[0].replace(':', '')] = {
      num1: nums[1],
      op: nums[2],
      num2: nums[3],
    };
  }
}

console.log(map, 'map');

function solve(map, node) {
  const currentNode = map[node];

  if (typeof currentNode === 'number') {
    return currentNode;
  } else {
    return eval(
      `${solve(map, currentNode.num1)}${currentNode.op}${solve(
        map,
        currentNode.num2
      )}`
    );
  }
}

console.log(solve(map, 'root'));
