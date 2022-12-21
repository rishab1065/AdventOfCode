const fs = require('fs');
let input = fs
  // .readFileSync('./sampleInput.txt', { encoding: 'utf8', flag: 'r' })
  .readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' })
  .trim()
  .split('\n');

let map = {};

for (const line of input) {
  const nums = line.split(' ');

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
let i = 0;

let factor = 1000000000000;

let prevAns = 1;

function solve(map, node, index) {
  const currentNode = map[node];
  if (node === 'humn') {
    return index;
  } else if (typeof currentNode === 'number') {
    return currentNode;
  } else if (node === 'root') {
    const num1 = solve(map, currentNode.num1, index);
    const num2 = solve(map, currentNode.num2, index);

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    } else {
      return 0;
    }
  } else {
    const n1 = solve(map, currentNode.num1, index);
    const n2 = solve(map, currentNode.num2, index);
    return eval(`${n1} ${currentNode.op} ${n2}`);
  }
}

while (true) {
  const ans = solve(map, 'root', i);
  // console.log(factor, i);

  if (ans === 0) {
    console.log(i);
    break;
  }

  if (prevAns !== ans) {
    factor = factor / 10;
  }

  if (ans === 1) {
    i = i + factor;
  } else {
    i = i - factor;
  }

  prevAns = ans;
}
