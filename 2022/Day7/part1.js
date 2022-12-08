let input = require('./input');

let sampleInput = [
  '$ cd /',
  '$ ls',
  'dir a',
  '14848514 b.txt',
  '8504156 c.dat',
  'dir d',
  '$ cd a',
  '$ ls',
  'dir e',
  '29116 f',
  '2557 g',
  '62596 h.lst',
  '$ cd e',
  '$ ls',
  '584 i',
  '$ cd ..',
  '$ cd ..',
  '$ cd d',
  '$ ls',
  '4060174 j',
  '8033020 d.log',
  '5626152 d.ext',
  '7214296 k',
];

// input = sampleInput;

const tree = {};

function readCommands(commands, currentCommandIndex, parent, path) {
  const currentCommand = commands[currentCommandIndex];
  // console.log(currentCommand, 'currentCommand');

  if (!currentCommand) {
    return;
  }

  if (currentCommand.startsWith('$')) {
    if (currentCommand.includes('cd')) {
      currentDir = currentCommand.split(' ').pop();

      if (currentDir === '..') {
        path.pop();
        let newParent = tree;
        const currentDirSize = parent['size'] || 0;

        for (var i = 0; i < path.length; i++) {
          newParent = newParent[path[i]];
        }

        if (!newParent['size']) {
          newParent['size'] = 0;
        }
        newParent['size'] += currentDirSize;

        readCommands(commands, currentCommandIndex + 1, newParent, path);
      } else {
        if (!parent[currentDir]) {
          parent[currentDir] = {};
        }
        path.push(currentDir);
        readCommands(
          commands,
          currentCommandIndex + 1,
          parent[currentDir],
          path
        );
      }
    } else if (currentCommand.includes('ls')) {
      readCommands(commands, currentCommandIndex + 1, parent, path);
    }
  } else {
    if (currentCommand.startsWith('dir')) {
      const dir = currentCommand.split(' ').pop();
      parent[dir] = {};
      readCommands(commands, currentCommandIndex + 1, parent, path);
    } else {
      const [size, name] = currentCommand.split(' ');
      parent[name] = parseInt(size);

      if (!parent['size']) {
        parent['size'] = 0;
      }
      parent['size'] += parseInt(size);

      readCommands(commands, currentCommandIndex + 1, parent, path);
    }
  }
}
readCommands(input, 0, tree, []);

// console.log(JSON.stringify(tree, null, 2));

let totalSize = 0;
function calculateTotalSize(parent) {
  const keys = Object.keys(parent);
  if (parent['size'] <= 100000) {
    totalSize += parent['size'];
  }
  for (var i = 0; i < keys.length; i++) {
    if (typeof parent[keys[i]] === 'object') {
      calculateTotalSize(parent[keys[i]]);
    }
  }
}
calculateTotalSize(tree);

console.log(totalSize);
