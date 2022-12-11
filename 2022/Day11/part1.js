let input = require('./input');
let sampleInput = require('./sampleInput');

// input = sampleInput;

let monkeys = [];
let currentMonkey = -1;

for (var i = 0; i < input.length; i++) {
  const line = input[i];
  if (line.includes('Monkey')) {
    currentMonkey = parseInt(line.replace('Monkey ', '').replace(':', ''));
    monkeys[currentMonkey] = {};
  } else if (line.includes('Starting items: ')) {
    const items = line
      .replace('Starting items: ', '')
      .split(', ')
      .map((item) => parseInt(item));
    monkeys[currentMonkey].items = items;
  } else if (line.includes('Operation: ')) {
    monkeys[currentMonkey].operation = line
      .replace('Operation: ', '')
      .replace('new =', '')
      .trim();
  } else if (line.includes('Test: ')) {
    monkeys[currentMonkey].testNumber = parseInt(
      line.replace('Test: divisible by ', '')
    );
  } else if (line.includes('If true: ')) {
    monkeys[currentMonkey].trueThrowMonkey = parseInt(
      line.replace('If true: throw to monkey ', '')
    );
  } else if (line.includes('If false: ')) {
    monkeys[currentMonkey].falseThrowMonkey = parseInt(
      line.replace('If false: throw to monkey ', '')
    );
  } else {
  }
  monkeys[currentMonkey].activeCount = 0;
}

// console.log(monkeys, 'monkeys');

let round = 1;
while (round <= 20) {
  for (let m = 0; m < monkeys.length; m++) {
    let { items, operation, testNumber, trueThrowMonkey, falseThrowMonkey } =
      monkeys[m];

    for (let itm = 0; itm < items.length; itm++) {
      let newStress = eval(operation.replace(/old/g, items[itm]));
      // distress
      newStress = Math.floor(newStress / 3);

      if (newStress % testNumber === 0) {
        monkeys[trueThrowMonkey].items.push(newStress);
      } else {
        monkeys[falseThrowMonkey].items.push(newStress);
      }
      monkeys[m].activeCount = monkeys[m].activeCount + 1;
    }
    monkeys[m].items = [];
  }

  round++;
}

// console.log(monkeys, 'monkeys');

let currentActive = [];
for (let monkey of monkeys) {
  currentActive.push(monkey.activeCount);
}
currentActive = currentActive.sort((a, b) => b - a);
console.log(currentActive[0] * currentActive[1], 'monkeys');
