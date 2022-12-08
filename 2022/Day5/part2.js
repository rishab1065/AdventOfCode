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
  let destinationStack = stacks[destinationStackNo - 1];

  let crates = [];

  while (crateCount > 0) {
    crates.push(sourceStack.pop());
    crateCount--;
  }
  crates.reverse();

  stacks[destinationStackNo - 1] = [...destinationStack, ...crates];
}

for (var i = 0; i < stacks.length; i++) {
  console.log(stacks[i].pop());
}

// DCVTCVPCL
