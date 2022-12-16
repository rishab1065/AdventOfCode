/// DIDN'T WORK

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

function dfs(currentValve, openedValves, time, otherPlayer) {
  if (time === 0) {
    return otherPlayer > 0 ? dfs('AA', openedValves, 26, otherPlayer - 1) : 0;
  }

  const key = `${currentValve}-${time}-${openedValves
    .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
    .join('')}-${otherPlayer}`;

  if (results[key] >= 0) {
    // console.log(results[key], 'object');
    return results[key];
  }

  let totalPressure = 0;
  if (!openedValves.includes(currentValve) && map[currentValve].rate > 0) {
    // console.log(openedValves, currentValve, 'openedValves');
    totalPressure = Math.max(
      totalPressure,
      map[currentValve].rate * (time - 1) +
        dfs(
          currentValve,
          [...openedValves, currentValve],
          time - 1,
          otherPlayer
        )
    );
  }
  // console.log(totalPressure, currentValve, 'totalPressure');

  for (const nextTunnel of map[currentValve].nextTunnels) {
    // console.log(nextTunnel, time, 'nextTunnel');
    totalPressure = Math.max(
      totalPressure,
      dfs(nextTunnel, openedValves, time - 1, otherPlayer)
    );
  }

  results[key] = totalPressure;

  return totalPressure;
}

console.log(dfs('AA', [], 26, 1), 'results');
