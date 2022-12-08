let input = require('./input');

const sampleInput = [
  [
    [2, 4],
    [6, 8],
  ],
  [
    [2, 3],
    [4, 5],
  ],
  [
    [5, 7],
    [7, 9],
  ],
  [
    [2, 8],
    [3, 7],
  ],
  [
    [6, 6],
    [4, 6],
  ],
  [
    [2, 6],
    [4, 8],
  ],
];

// input = sampleInput;

let totalPair = 0;
for (var i = 0; i < input.length; i++) {
  const [firstSection, secondSection] = input[i];

  if (
    firstSection[1] < secondSection[0] ||
    secondSection[1] < firstSection[0]
  ) {
  } else {
    totalPair += 1;
  }
}

console.log(totalPair, 'totalPair');
