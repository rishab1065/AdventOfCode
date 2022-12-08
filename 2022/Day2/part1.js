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
  X: 1,
  Y: 2,
  Z: 3,
  W: 6,
  D: 3,
  L: 0,
};

const gameMap = {
  ROCK: ['A', 'X'],
  PAPER: ['B', 'Y'],
  SCISSORS: ['C', 'Z'],
};

// input = sampleInput;

let totalPoints = 0;
let currentRoundPoints = 0;
for (var i = 0; i < input.length; i++) {
  const [opponentTurn, myTurn] = input[i];

  currentRoundPoints += pointMap[myTurn];

  const { ROCK, PAPER, SCISSORS } = gameMap;

  if (
    (SCISSORS.includes(opponentTurn) && SCISSORS.includes(myTurn)) ||
    (PAPER.includes(opponentTurn) && PAPER.includes(myTurn)) ||
    (ROCK.includes(opponentTurn) && ROCK.includes(myTurn))
  ) {
    // draw
    currentRoundPoints += pointMap['D'];
  } else if (
    (SCISSORS.includes(opponentTurn) && ROCK.includes(myTurn)) ||
    (PAPER.includes(opponentTurn) && SCISSORS.includes(myTurn)) ||
    (ROCK.includes(opponentTurn) && PAPER.includes(myTurn))
  ) {
    // win
    currentRoundPoints += pointMap['W'];
  } else {
    // lose
    currentRoundPoints += pointMap['L'];
  }
  totalPoints += currentRoundPoints;
  currentRoundPoints = 0;
}

console.log(totalPoints, 'totalPoints');
