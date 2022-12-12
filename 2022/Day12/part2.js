let input = require('./input');
let sampleInput = require('./sampleInput');

// input = sampleInput;

let endPos = [];
let startPositions = [];

for (let i = 0; i < input.length; i++) {
  input[i] = input[i].split('');
  input[i].forEach((ele, index) => {
    if (ele === 'S') {
      input[i][index] = 1;
      startPositions.push([i, index]);
    } else if (ele === 'E') {
      input[i][index] = 26;
      endPos = [i, index];
    } else {
      input[i][index] = ele.charCodeAt(0) - 96;
      if (input[i][index] === 1) {
        startPositions.push([i, index]);
      }
    }
  });
}

function bfs(startPos, endPos) {
  const queue = [{ node: startPos, dist: 0 }];
  const visited = {};

  while (queue.length > 0) {
    const { node, dist } = queue.shift();

    if (visited[`${node[0]},${node[1]}`]) {
      continue;
    } else {
      visited[`${node[0]},${node[1]}`] = true;

      if (node[0] === endPos[0] && node[1] === endPos[1]) {
        return dist;
      }

      for (let delta of [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
      ]) {
        const currentElevation = input[node[0]][node[1]];
        const newX = node[0] + delta[0];
        const newY = node[1] + delta[1];

        if (
          newX >= 0 &&
          newX < input.length &&
          newY > 0 &&
          newY < input[0].length &&
          input[newX][newY] <= currentElevation + 1
        ) {
          queue.push({ node: [newX, newY], dist: dist + 1 });
        }
      }
    }
  }
}

let minSteps = Number.MAX_SAFE_INTEGER;
for (const startPos of startPositions) {
  const steps = bfs(startPos, endPos);
  if (steps) minSteps = Math.min(steps, minSteps);
}

console.log(minSteps);
