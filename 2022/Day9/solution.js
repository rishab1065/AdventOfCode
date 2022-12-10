const fs = require('fs');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8' });

// Split to single steps
// R, R, R
const steps = input
  .split('\n')
  .map((s) => {
    const [dir, steps] = s.split(' ');
    return [dir, parseInt(steps)];
  })
  .reduce((acc, [dir, steps]) => {
    for (let i = 0; i < steps; i++) {
      acc.push(dir);
    }
    return acc;
  }, []);

const nextHead = ([x, y], dir) => {
  let [nx, ny] = [x, y];
  switch (dir) {
    case 'U':
      ny = ny + 1;
      break;
    case 'D':
      ny = ny - 1;
      break;
    case 'R':
      nx = nx + 1;
      break;
    case 'L':
      nx = nx - 1;
      break;
  }
  return [nx, ny];
};

const tailIsTooFar = (head, tail) => {
  return Math.abs(head[0] - tail[0]) > 1 || Math.abs(head[1] - tail[1]) > 1;
};

const nextTail = (head, tail) => {
  let nTail = tail;
  if (head[0] == tail[0]) {
    // Same row
    nTail[1] = tail[1] + (head[1] - tail[1] > 0 ? 1 : -1);
  } else if (head[1] == tail[1]) {
    // Same column
    nTail[0] = tail[0] + (head[0] - tail[0] > 0 ? 1 : -1);
  } else {
    // diagonal
    nTail[1] = tail[1] + (head[1] - tail[1] > 0 ? 1 : -1);
    nTail[0] = tail[0] + (head[0] - tail[0] > 0 ? 1 : -1);
  }
  return nTail;
};

const saveMark = (marks, tail) => {
  marks[tail[0]] = marks[tail[0]] || {};
  marks[tail[0]][tail[1]] = true;
  return marks;
};

const [, , finalMarksShortRope] = steps.reduce(
  ([head, tail, marks], step) => {
    const nHead = nextHead(head, step);
    let nTail = tail;
    if (tailIsTooFar(nHead, tail)) {
      nTail = nextTail(nHead, tail);
    }
    return [nHead, nTail, saveMark(marks, nTail)];
  },
  [
    [0, 0], // Head start
    [0, 0], // Tail start
    {}, // Tail marks
  ]
);

const totalMarksShortRope = Object.keys(finalMarksShortRope).reduce(
  (sum, x) => sum + Object.keys(finalMarksShortRope[x]).length,
  0
);
console.log('TOTAL MARKS of short rope:', totalMarksShortRope);

const [, finalMarksLongRope] = steps.reduce(
  ([rope, marks], step) => {
    rope[0] = nextHead(rope[0], step);
    // for each knot
    for (let i = 1; i < rope.length; i++) {
      if (tailIsTooFar(rope[i - 1], rope[i])) {
        rope[i] = nextTail(rope[i - 1], rope[i]);
      }
    }
    return [rope, saveMark(marks, rope[rope.length - 1])];
  },
  [
    [
      [0, 0], // Head start
      [0, 0], // 1
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0], // 9
    ],
    {}, // Tail marks
  ]
);

const totalMarksLongRope = Object.keys(finalMarksLongRope).reduce(
  (sum, x) => sum + Object.keys(finalMarksLongRope[x]).length,
  0
);
console.log('TOTAL MARKS of long rope:', totalMarksLongRope);
