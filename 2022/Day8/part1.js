let input = require('./input');

let sampleInput = ['30373', '25512', '65332', '33549', '35390'];

// input = sampleInput;

for (x = 0; x < input.length; x++) {
  input[x] = input[x].split('').map((num) => parseInt(num));
}

let visibleTrees = 0;

for (var i = 0; i < input.length; i++) {
  for (var j = 0; j < input[i].length; j++) {
    if (
      j - 1 < 0 ||
      j + 1 > input.length - 1 ||
      i - 1 < 0 ||
      i + 1 > input.length - 1
    ) {
      visibleTrees++;
    } else {
      if (!isHidden(i, j, input)) {
        visibleTrees++;
      }
    }
  }
}

console.log(visibleTrees, 'visibleTrees');

function isHidden(i, j, input) {
  let left = i - 1;
  let isLeftHidden = false;
  while (left >= 0) {
    if (input[left][j] >= input[i][j]) {
      isLeftHidden = true;
    }
    left--;
  }

  let right = i + 1;
  let isRightHidden = false;
  while (right < input.length) {
    if (input[right][j] >= input[i][j]) {
      isRightHidden = true;
    }
    right++;
  }

  let top = j - 1;
  let isTopHidden = false;
  while (top >= 0) {
    if (input[i][top] >= input[i][j]) {
      isTopHidden = true;
    }
    top--;
  }

  let bottom = j + 1;
  let isBottomHidden = false;
  while (bottom < input.length) {
    if (input[i][bottom] >= input[i][j]) {
      isBottomHidden = true;
    }
    bottom++;
  }

  return isBottomHidden && isTopHidden && isRightHidden && isLeftHidden;
}
