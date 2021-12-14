const fs = require('fs');
const input = fs
	.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' })
	.trim()
	.split('\n');

const map = {};

input.forEach((line) => {
	const part1 = line.split('->')[0].trim();
	map[part1] = line.split('->')[1].trim();
});

// console.log(map, 'input');
let steps = 10;
let line = 'OFSVVSFOCBNONHKFHNPK';

while (steps--) {
	for (let i = 0; i < line.length; ) {
		if (i === line.length - 1) {
			break;
		}
		if (map[`${line[i]}${line[i + 1]}`]) {
			// console.log(map[`${line[i]}${line[i + 1]}`]);

			line =
				line.substring(0, i + 1) +
				map[`${line[i]}${line[i + 1]}`] +
				line.substring(i + 1);

			i = i + 2;
		} else {
			i++;
		}
	}
	console.log(steps);
}
console.log(line.length);
let count = {};
line.split('').forEach((ele) => {
	if (!count[ele]) {
		count[ele] = 0;
	}
	count[ele]++;
});
console.log(count);
