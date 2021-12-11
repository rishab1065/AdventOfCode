const fs = require('fs');

const input = fs
	.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' })
	.trim()
	.split('\n')
	.map((line) => {
		return line.split('');
	});

var score = {
	'(': 1,
	'[': 2,
	'{': 3,
	'<': 4,
};
let result = [];
for (var i = 0; i < input.length; i++) {
	const line = input[i];
	const stack = [];
	let pair = 0;
	let invalid = false;
	for (var j = 0; j < line.length; j++) {
		const char = line[j];

		if (char == '<' || char == '{' || char == '(' || char == '[') {
			stack.push(char);
		} else {
			if (stack[stack.length - 1] === '<' && char === '>') {
				stack.pop();
				pair++;
			} else if (stack[stack.length - 1] === '{' && char === '}') {
				stack.pop();
				pair++;
			} else if (stack[stack.length - 1] === '[' && char === ']') {
				stack.pop();
				pair++;
			} else if (stack[stack.length - 1] === '(' && char === ')') {
				stack.pop();
				pair++;
			} else {
				invalid = true;
				break;
			}
		}
	}
	if (!invalid) {
		var res = stack.reverse().reduce((acc, ele) => {
			return acc * 5 + score[ele];
		}, 0);
		result.push(res);
	}
}
result = result.sort((a, b) => a - b);
var len = result.length - 1;
console.log(result[len / 2], 'result');
