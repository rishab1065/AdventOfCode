const fs = require('fs');
let input = fs
  // .readFileSync('./sampleInput.txt', { encoding: 'utf8', flag: 'r' })
  .readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' })
  .trim()
  .split('\n');

const regexp =
  /Blueprint (?<blueprint>-?\d+): Each ore robot costs (?<oreRobotCost>-?\d+) ore. Each clay robot costs (?<clayRobotCost>-?\d+) ore. Each obsidian robot costs (?<obsidianRobotOreCost>-?\d+) ore and (?<obsidianRobotClayCost>-?\d+) clay. Each geode robot costs (?<geodeRobotOreCost>-?\d+) ore and (?<geodeRobotObsidianCost>-?\d+) obsidian./;

let blueprints = [];

for (let blueprint of input) {
  const match = blueprint.match(regexp).groups;

  blueprints.push({
    blueprint: parseInt(match.blueprint),
    oreRobotCost: parseInt(match.oreRobotCost),
    clayRobotCost: parseInt(match.clayRobotCost),
    obsidianRobotOreCost: parseInt(match.obsidianRobotOreCost),
    obsidianRobotClayCost: parseInt(match.obsidianRobotClayCost),
    geodeRobotOreCost: parseInt(match.geodeRobotOreCost),
    geodeRobotObsidianCost: parseInt(match.geodeRobotObsidianCost),
  });
}

// takes too long
var DP = {};

let result = 0;

blueprints = blueprints.slice(0, 3);
console.log(blueprints, 'blueprints');

console.time('all bfs');
for (let blueprint of blueprints) {
  DP = {};
  console.log(blueprint.blueprint, 'blueprint');
  result += bfs(blueprint) * blueprint.blueprint;
}
console.timeEnd('all bfs');

function bfs({
  oreRobotCost,
  clayRobotCost,
  obsidianRobotOreCost,
  obsidianRobotClayCost,
  geodeRobotOreCost,
  geodeRobotObsidianCost,
}) {
  // oreCount, clayCount, obsidianCount, geodeCount, oreRobot, clayRobot, obsidianRobot, geodeRobot, time
  const queue = [[0, 0, 0, 0, 1, 0, 0, 0, 32]];
  let result = 0;

  while (queue.length > 0) {
    let key = queue.shift();

    let [
      oreCount,
      clayCount,
      obsidianCount,
      geodeCount,
      oreRobot,
      clayRobot,
      obsidianRobot,
      geodeRobot,
      time,
    ] = key;

    result = Math.max(geodeCount, result);
    if (time === 0) {
      continue;
    }

    const maxOreReq = Math.max(
      oreRobotCost,
      clayRobotCost,
      obsidianRobotOreCost,
      geodeRobotOreCost
    );

    if (oreRobot >= maxOreReq) {
      oreRobot = maxOreReq;
    }
    if (clayRobot >= obsidianRobotClayCost) {
      clayRobot = obsidianRobotClayCost;
    }

    if (obsidianRobot >= geodeRobotObsidianCost) {
      clayRobot = obsidianRobotClayCost;
    }

    if (oreCount >= time * maxOreReq - oreRobot * (time - 1)) {
      oreCount = time * maxOreReq - oreRobot * (time - 1);
    }

    if (clayCount >= time * obsidianRobotClayCost - clayRobot * (time - 1)) {
      clayCount = time * obsidianRobotClayCost - clayRobot * (time - 1);
    }

    if (
      obsidianCount >=
      time * geodeRobotObsidianCost - obsidianRobot * (time - 1)
    ) {
      obsidianCount =
        time * geodeRobotObsidianCost - obsidianRobot * (time - 1);
    }

    key = [
      oreCount,
      clayCount,
      obsidianCount,
      geodeCount,
      oreRobot,
      clayRobot,
      obsidianRobot,
      geodeRobot,
      time,
    ];

    if (DP[key.join(',')]) {
      if (queue.length % 10000 === 0) console.log(key.join(','));
      continue;
    }

    DP[key.join(',')] = true;

    // not creating any robot
    queue.push([
      oreCount + oreRobot,
      clayCount + clayRobot,
      obsidianCount + obsidianRobot,
      geodeCount + geodeRobot,
      oreRobot,
      clayRobot,
      obsidianRobot,
      geodeRobot,
      time - 1,
    ]);

    // console.log(oreCount, oreRobotCost);
    // creating ore robot
    if (oreCount >= oreRobotCost) {
      queue.push([
        oreCount - oreRobotCost + oreRobot,
        clayCount + clayRobot,
        obsidianCount + obsidianRobot,
        geodeCount + geodeRobot,
        oreRobot + 1,
        clayRobot,
        obsidianRobot,
        geodeRobot,
        time - 1,
      ]);
    }

    // creating clay robot
    if (oreCount >= clayRobotCost) {
      queue.push([
        oreCount - clayRobotCost + oreRobot,
        clayCount + clayRobot,
        obsidianCount + obsidianRobot,
        geodeCount + geodeRobot,
        oreRobot,
        clayRobot + 1,
        obsidianRobot,
        geodeRobot,
        time - 1,
      ]);
    }

    // creating obsidian robot
    if (
      oreCount >= obsidianRobotOreCost &&
      clayCount >= obsidianRobotClayCost
    ) {
      queue.push([
        oreCount - obsidianRobotOreCost + oreRobot,
        clayCount - obsidianRobotClayCost + clayRobot,
        obsidianCount + obsidianRobot,
        geodeCount + geodeRobot,
        oreRobot,
        clayRobot,
        obsidianRobot + 1,
        geodeRobot,
        time - 1,
      ]);
    }

    // creating obsidian robot
    if (
      oreCount >= geodeRobotOreCost &&
      obsidianCount >= geodeRobotObsidianCost
    ) {
      queue.push([
        oreCount - geodeRobotOreCost + oreRobot,
        clayCount + clayRobot,
        obsidianCount - geodeRobotObsidianCost + obsidianRobot,
        geodeCount + geodeRobot,
        oreRobot,
        clayRobot,
        obsidianRobot,
        geodeRobot + 1,
        time - 1,
      ]);
    }

    // console.log(queue, 'queue');
  }

  return result;
}

console.log(result, 'DP[key]');
