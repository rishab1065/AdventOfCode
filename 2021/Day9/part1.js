const fs = require('fs');

const input = fs
	.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' })
	.trim()
	.split('\n')
	.map((line) => {
		return line.split('').map((ele) => parseInt(ele));
	});

let result = 0;
for (var i = 0; i < input.length; i++) {
	for (var j = 0; j < input[i].length; j++) {
		const num = input[i][j];
		const up = i - 1 >= 0 ? input[i - 1][j] : 99999;
		const down = i + 1 < input.length ? input[i + 1][j] : 99999;
		const left = j - 1 >= 0 ? input[i][j - 1] : 99999;
		const right = j + 1 < input[i].length ? input[i][j + 1] : 99999;

		if (left > num && right > num && up > num && down > num) {
			result = result + num + 1;
		}
	}
}
console.log(result);
