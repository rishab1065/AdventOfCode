let input = require('./input');

const sampleInput = [
  'vJrwpWtwJgWrhcsFMMfFFhFp',
  'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
  'PmmdzqPrVvPwwTWBwg',
  'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
  'ttgJtRGJQctTZtZT',
  'CrZsJsPPZsGzwwsLwLmpwMDw',
];

// input = sampleInput;

let totalPriority = 0;

function getPriority(char) {
  const charCode = char.charCodeAt(0);
  if (charCode > 96 && charCode < 123) {
    return charCode - 96;
  } else if (charCode > 64 && charCode < 91) {
    return charCode - 64 + 26;
  }
  return 0;
}

for (var i = 0; i < input.length; i++) {
  const firstCompartment = input[i].substr(0, input[i].length / 2).split('');
  const secondCompartment = input[i].substr(input[i].length / 2).split('');
  const commonItems = [];

  for (var j = 0; j < firstCompartment.length; j++) {
    const currentChar = firstCompartment[j];
    if (
      secondCompartment.includes(currentChar) &&
      !commonItems.includes(currentChar)
    ) {
      commonItems.push(currentChar);
      totalPriority += getPriority(currentChar);
    }
  }
}

console.log(totalPriority, 'totalPriority');
