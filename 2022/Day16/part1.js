const fs = require('fs');
let input = fs
  // .readFileSync('./sampleInput.txt', { encoding: 'utf8', flag: 'r' })
  .readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' })
  .trim()
  .split('\n');

const map = {};

console.log(input, 'input');

for (let line of input) {
  line = line
    .replace('Valve', '')
    .replace('has flow rate=', '')
    .trim()
    .replace(';', '')
    .trim()
    .replace('tunnel leads to valve', '')
    .replace('tunnels lead to valves', '')
    .replace(/,/g, '')
    .trim()
    .split(' ');

  const valve = line.shift();
  const rate = parseInt(line.shift());
  line.shift();
  map[valve] = { rate, nextTunnels: line };
}

let results = {};

function dfs(currentValve, openedValves, time) {
  if (time === 0) {
    return 0;
  }

  const key = `${currentValve}-${time}-${openedValves
    .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
    .join('')}`;

  if (results[key] >= 0) {
    return results[key];
  }

  let totalPressure = 0;
  if (!openedValves.includes(currentValve) && map[currentValve].rate > 0) {
    // console.log(openedValves, currentValve, 'openedValves');
    totalPressure = Math.max(
      totalPressure,
      map[currentValve].rate * (time - 1) +
        dfs(currentValve, [...openedValves, currentValve], time - 1)
    );
  }
  // console.log(totalPressure, currentValve, 'totalPressure');

  for (const nextTunnel of map[currentValve].nextTunnels) {
    // console.log(nextTunnel, time, 'nextTunnel');
    totalPressure = Math.max(
      totalPressure,
      dfs(nextTunnel, openedValves, time - 1)
    );
  }

  results[key] = totalPressure;

  return totalPressure;
}

console.time('fsdfsd');
console.log(dfs('AA', [], 30), 'results');
console.timeEnd('fsdfsd');
