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

// console.log(connections, nodes, 'hello');

dfs('start', []);

function isBigCave(node) {
	return node.toUpperCase() === node;
}

function dfs(node, path) {
	if (path.includes(node) && !isBigCave(node)) {
		return false;
	}
	if (node === 'end') {
		// path.push(node);
		// console.log(path, 'path');
		// path.pop();
		totalPaths++;
		return true;
	}

	path.push(node);
	for (var i = 0; i < nodes.length; i++) {
		if (
			nodes[i] !== node &&
			(connections[`${nodes[i]},${node}`] || connections[`${node},${nodes[i]}`])
		) {
			// console.log(node, nodes[i], path, 'for loop');
			dfs(nodes[i], path);
		}
	}
	path.pop();
}

console.log(totalPaths, 'fds');
