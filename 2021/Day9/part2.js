const fs = require('fs');

const input = fs
	.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' })
	.trim()
	.split('\n')
	.map((line) => {
		return line.split('').map((ele) => parseInt(ele));
	});

var visitedNodes = {};
let basins = [];
for (var i = 0; i < input.length; i++) {
	for (var j = 0; j < input[i].length; j++) {
		const num = input[i][j];
		const up = i - 1 >= 0 ? input[i - 1][j] : 99999;
		const down = i + 1 < input.length ? input[i + 1][j] : 99999;
		const left = j - 1 >= 0 ? input[i][j - 1] : 99999;
		const right = j + 1 < input[i].length ? input[i][j + 1] : 99999;

		if (left > num && right > num && up > num && down > num) {
			var basinLen = dfs(i, j, input.length, input[i].length, input);
			basins.push(basinLen);
		}
	}
}
basins = basins.sort((a, b) => b - a);
console.log(basins[0] * basins[1] * basins[2]);

function dfs(i, j, iLen, jLen, input) {
	if (i === iLen || j === jLen || i < 0 || j < 0 || visitedNodes[`${i},${j}`]) {
		return 0;
	}

	if (input[i][j] === 9) {
		return 0;
	}
	visitedNodes[`${i},${j}`] = true;
	const left = dfs(i, j - 1, iLen, jLen, input);
	const right = dfs(i, j + 1, iLen, jLen, input);
	const up = dfs(i - 1, j, iLen, jLen, input);
	const down = dfs(i + 1, j, iLen, jLen, input);

	return down + up + right + left + 1;
}
