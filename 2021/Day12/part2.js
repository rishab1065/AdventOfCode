const fs = require('fs');
const input = fs
	.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' })
	.trim()
	.split('\n')
	.map((line) => {
		return line.split('-');
	});

const connections = {};
const nodes = [];
let totalPaths = 0;
let visitedTwiceNode = [];
input.forEach((line) => {
	connections[`${line[0]},${line[1]}`] = true;
	connections[`${line[1]},${line[0]}`] = true;
	if (!nodes.includes(line[1])) {
		nodes.push(line[1]);
	}
	if (!nodes.includes(line[0])) {
		nodes.push(line[0]);
	}
});

// console.log(starts, 'starts');

dfs('start', []);

function isBigCave(node) {
	return node.toUpperCase() === node;
}

function dfs(node, path) {
	// console.log(node, 'dfs entry');

	if (
		path.includes(node) &&
		!isBigCave(node) &&
		visitedTwiceNode.length === 1
	) {
		return false;
	} else if (path.includes(node) && !isBigCave(node)) {
		visitedTwiceNode.push(node);
	}

	if (node === 'end') {
		// path.push(node);
		// console.log(path.join(), 'path');
		// path.pop();
		totalPaths++;
		return true;
	}

	path.push(node);
	for (var i = 0; i < nodes.length; i++) {
		if (
			nodes[i] !== node &&
			nodes[i] !== 'start' &&
			(connections[`${nodes[i]},${node}`] || connections[`${node},${nodes[i]}`])
		) {
			// console.log(node, nodes[i], path, 'for loop');
			dfs(nodes[i], path);
		}
	}
	const popped = path.pop();

	if (popped === visitedTwiceNode[0]) {
		visitedTwiceNode = [];
	}
}

console.log(totalPaths, 'fds');
