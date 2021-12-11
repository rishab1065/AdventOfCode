const fs = require('fs');
const input = fs
	.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' })
	.trim()
	.split('\n')
	.map((line) => {
		return line.split('').map((ele) => parseInt(ele));
	});

let steps = 100;
let flashes = 0;
while (steps--) {
	var flashedNodes = {};
	for (var i = 0; i < input.length; i++) {
		for (var j = 0; j < input[i].length; j++) {
			if (!flashedNodes[`${i},${j}`]) {
				input[i][j] += 1;
			}
			if (input[i][j] > 9) {
				dfs(i, j, input.length, input[i].length, input);
			}
		}
	}
}
console.log(flashes);

function dfs(i, j, iLen, jLen, input) {
	if (i === iLen || j === jLen || i < 0 || j < 0 || flashedNodes[`${i},${j}`]) {
		return 0;
	}

	if (input[i][j] > 9) {
		flashes++;
		flashedNodes[`${i},${j}`] = true;
		input[i][j] = 0;

		increment(i, j - 1); // left
		increment(i, j + 1); // right

		increment(i - 1, j); // up
		increment(i - 1, j - 1); // down left
		increment(i - 1, j + 1); // down right

		increment(i + 1, j); // down
		increment(i + 1, j - 1); // up left
		increment(i + 1, j + 1); // up right

		dfs(i, j - 1, iLen, jLen, input);
		dfs(i, j + 1, iLen, jLen, input);
		dfs(i - 1, j, iLen, jLen, input);
		dfs(i + 1, j, iLen, jLen, input);
		dfs(i - 1, j - 1, iLen, jLen, input);
		dfs(i - 1, j + 1, iLen, jLen, input);
		dfs(i + 1, j - 1, iLen, jLen, input);
		dfs(i + 1, j + 1, iLen, jLen, input);
	} else {
	}

	return -1;
}

function increment(i, j) {
	if (
		input[i] !== undefined &&
		input[i][j] !== undefined &&
		!flashedNodes[`${i},${j}`]
	) {
		input[i][j] += 1;
	}
}
