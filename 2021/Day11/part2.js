const fs = require('fs');
const input = fs
	.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' })
	.trim()
	.split('\n')
	.map((line) => {
		return line.split('').map((ele) => parseInt(ele));
	});

let steps = 0;
let flashes = 0;
while (steps < 1000) {
	var flashedNodes = {};
	for (var i = 0; i < input.length; i++) {
		for (var j = 0; j < input[i].length; j++) {
			if (!flashedNodes[`${i},${j}`]) {
				input[i][j] += 1;
			}
			if (input[i][j] > 9) {
				dfs(i, j, input.length, input[i].length, input);
			} else {
			}
		}
	}
	let sync = true;
	for (var i = 0; i < input.length; i++) {
		for (var j = 0; j < input[i].length; j++) {
			if (input[i][j] === 0) {
				sync = sync && true;
			} else {
				sync = sync && false;
			}
		}
	}
	if (sync) {
		console.log(steps + 1);
		break;
	}
	steps++;
}

function dfs(i, j, iLen, jLen, input) {
	if (i === iLen || j === jLen || i < 0 || j < 0 || flashedNodes[`${i},${j}`]) {
		return 0;
	}

	if (input[i][j] > 9) {
		flashes++;
		flashedNodes[`${i},${j}`] = true;
		input[i][j] = 0;

		increment(i, j - 1);
		increment(i, j + 1);

		increment(i - 1, j);
		increment(i - 1, j - 1);
		increment(i - 1, j + 1);

		increment(i + 1, j);
		increment(i + 1, j - 1);
		increment(i + 1, j + 1);

		dfs(i, j - 1, iLen, jLen, input);
		dfs(i, j + 1, iLen, jLen, input);
		dfs(i - 1, j, iLen, jLen, input);
		dfs(i + 1, j, iLen, jLen, input);
		dfs(i - 1, j - 1, iLen, jLen, input);
		dfs(i - 1, j + 1, iLen, jLen, input);
		dfs(i + 1, j - 1, iLen, jLen, input);
		dfs(i + 1, j + 1, iLen, jLen, input);
	}

	return 0;
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
