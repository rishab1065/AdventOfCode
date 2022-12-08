let input = require('./input');

const sampleInput = {
  stacks: [['Z', 'N'], ['M', 'C', 'D'], ['P']],
  moves: [
    [1, 2, 1],
    [3, 1, 3],
    [2, 2, 1],
    [1, 1, 2],
  ],
};

// input = sampleInput;

const { moves, stacks } = input;
for (var i = 0; i < moves.length; i++) {
  let [crateCount, sourceStackNo, destinationStackNo] = moves[i];
  const sourceStack = stacks[sourceStackNo - 1];
  const destinationStack = stacks[destinationStackNo - 1];

  while (crateCount > 0) {
    destinationStack.push(sourceStack.pop());
    crateCount--;
  }
}

for (var i = 0; i < stacks.length; i++) {
  console.log(stacks[i].pop());
}

// SVFDLGLWV
