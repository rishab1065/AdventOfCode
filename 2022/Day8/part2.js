let input = require('./input');

let sampleInput = ['30373', '25512', '65332', '33549', '35390'];

// input = sampleInput;

for (x = 0; x < input.length; x++) {
  input[x] = input[x].split('').map((num) => parseInt(num));
}

let maxScenicScore = 0;

for (var i = 0; i < input.length; i++) {
  // console.log('-------------------------------------');
  for (var j = 0; j < input[i].length; j++) {
    const scenicScore = getScenicScore(i, j, input);
    // console.log(scenicScore, 'scenicScore');
    maxScenicScore = Math.max(maxScenicScore, scenicScore);
  }
}

console.log(maxScenicScore, 'maxScenicScore');

function getScenicScore(i, j, input) {
  let left = i - 1;
  let leftVisibleTree = 0;

  while (left >= 0) {
    if (input[left][j] < input[i][j]) {
      leftVisibleTree++;
    } else {
      leftVisibleTree++;
      break;
    }
    left--;
  }

  let right = i + 1;
  let rightVisibleTree = 0;

  while (right < input.length) {
    if (input[right][j] < input[i][j]) {
      rightVisibleTree++;
    } else {
      rightVisibleTree++;
      break;
    }
    right++;
  }

  let top = j - 1;
  let topVisibleTree = 0;

  while (top >= 0) {
    if (input[i][top] < input[i][j]) {
      topVisibleTree++;
    } else {
      topVisibleTree++;
      break;
    }
    top--;
  }

  let bottom = j + 1;
  let bottomVisibleTree = 0;

  while (bottom < input.length) {
    if (input[i][bottom] < input[i][j]) {
      bottomVisibleTree++;
    } else {
      bottomVisibleTree++;
      break;
    }
    bottom++;
  }

  return (
    bottomVisibleTree * topVisibleTree * rightVisibleTree * leftVisibleTree
  );
}
