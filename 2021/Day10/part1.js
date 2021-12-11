const fs = require('fs');

const input = fs
	.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' })
	.trim()
	.split('\n')
	.map((line) => {
		return line.split('');
	});

var score = {
	')': 3,
	']': 57,
	'}': 1197,
	'>': 25137,
};
let result = 0;
for (var i = 0; i < input.length; i++) {
	const line = input[i];
	const stack = [];
	let pair = 0;
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
				result += score[char];
				break;
			}
		}
	}
	// console.log(pair, 'stack');
}
console.log(result, 'result');
