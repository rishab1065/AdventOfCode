let input = require('./input');

const sampleInput = [
  ['A', 'Y'],
  ['B', 'X'],
  ['C', 'Z'],
];

const pointMap = {
  A: 1,
  B: 2,
  C: 3,
  W: 6,
  D: 3,
  L: 0,
};

const gameMap = {
  ROCK: 'A',
  PAPER: 'B',
  SCISSORS: 'C',
};

const outcomeMap = {
  X: 'L',
  Y: 'D',
  Z: 'W',
};

// input = sampleInput;

let totalPoints = 0;
let currentRoundPoints = 0;
for (var i = 0; i < input.length; i++) {
  const [opponentTurn, outcome] = input[i];
  const { ROCK, PAPER, SCISSORS } = gameMap;

  if (outcomeMap[outcome] === 'W') {
    // win
    currentRoundPoints += pointMap['W'];

    if (opponentTurn === ROCK) {
      // to win we need paper
      currentRoundPoints += pointMap[PAPER];
    } else if (opponentTurn === PAPER) {
      // to win we need scissors
      currentRoundPoints += pointMap[SCISSORS];
    } else if (opponentTurn === SCISSORS) {
      // to win we need rock
      currentRoundPoints += pointMap[ROCK];
    }
  } else if (outcomeMap[outcome] === 'L') {
    // lose
    currentRoundPoints += pointMap['L'];

    if (opponentTurn === ROCK) {
      // to lose we need scissors
      currentRoundPoints += pointMap[SCISSORS];
    } else if (opponentTurn === PAPER) {
      // to lose we need rock
      currentRoundPoints += pointMap[ROCK];
    } else if (opponentTurn === SCISSORS) {
      // to lose we need paper
      currentRoundPoints += pointMap[PAPER];
    }
  } else {
    // draw
    currentRoundPoints += pointMap['D'];

    // to draw we need same as opponent
    currentRoundPoints += pointMap[opponentTurn];
  }
  totalPoints += currentRoundPoints;
  currentRoundPoints = 0;
}

console.log(totalPoints, 'totalPoints');
