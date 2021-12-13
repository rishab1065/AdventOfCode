const fs = require('fs');
const input = fs
	.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' })
	.trim()
	.split('\n');

// console.log(input, 'input');

let map = {};
let newMap = {};

input.forEach((ele) => {
	// console.log(ele, 'ele');
	map[ele] = true;
});

// console.log(map, 'map');

var folds = [
	[655, 0],
	[0, 447],
	[327, 0],
	[0, 223],
	[163, 0],
	[0, 111],
	[81, 0],
	[0, 55],
	[40, 0],
	[0, 27],
	[0, 13],
	[0, 6],
];
// print();
folds.forEach((fold) => {
	const x = fold[0];
	const y = fold[1];

	Object.keys(map).forEach((line) => {
		const coord = line.split(',').map((ele) => parseInt(ele));
		// console.log(coord, 'coord');
		if (x == 0 && coord[1] >= y && map[line]) {
			// console.log(coord, line, 'coord');
			map[line] = false;
			const newX = coord[0];
			const newY = y - (coord[1] - y);
			// console.log(newX, 'newX', newY, 'newY');
			if (newX > -1 && newY > -1) {
				// console.log(newX, newY);
				newMap[`${newX},${newY}`] = true;
			}
		} else if (y == 0 && coord[0] >= x && map[line]) {
			// console.log(coord, line, 'coord');
			map[line] = false;
			const newY = coord[1];
			const newX = x - (coord[0] - x);
			// console.log(newX, 'newX', newY, 'newY');
			if (newX > -1 && newY > -1) {
				// console.log(newX, newY);
				newMap[`${newX},${newY}`] = true;
			}
		} else {
			newMap[line] = map[line];
		}
	});
	map = newMap;
	print();
	// console.log(map, 'fold1');
});
// console.log(map, 'fold1');
let result = 0;

Object.keys(map).forEach((line) => {
	if (map[line]) {
		result++;
	}
});
// console.log(result, 'result');

function print() {
	for (var i = 0; i < 6; i++) {
		//vertical
		let line = [];
		for (var j = 0; j < 40; j++) {
			// horizontal
			if (map[`${j},${i}`]) {
				line.push('#');
			} else {
				line.push('.');
			}
		}
		console.log(line.join(''));
	}
	console.log('\n');
}
