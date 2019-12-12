let originalInput =
  "1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,6,19,1,9,19,23,2,23,10,27,1,27,5,31,1,31,6,35,1,6,35,39,2,39,13,43,1,9,43,47,2,9,47,51,1,51,6,55,2,55,10,59,1,59,5,63,2,10,63,67,2,9,67,71,1,71,5,75,2,10,75,79,1,79,6,83,2,10,83,87,1,5,87,91,2,9,91,95,1,95,5,99,1,99,2,103,1,103,13,0,99,2,14,0,0";
originalInput = originalInput.split(",");

originalInput = originalInput.map(element => {
  return parseInt(element);
});

var breakOuterLoop = false;
for (var noun = 0; noun < 100; noun++) {
  for (var verb = 0; verb < 100; verb++) {
    const modifiedInput = [...originalInput];
    modifiedInput[1] = noun;
    modifiedInput[2] = verb;
    if (program(modifiedInput) === 19690720) {
      breakOuterLoop = true;
      break;
    }
  }
  if (breakOuterLoop) break;
}
console.log(100 * noun + verb, "result");
function program(input) {
  for (var i = 0; i < input.length; i += 4) {
    const opCode = input[i];
    const valPos1 = input[i + 1];
    const valPos2 = input[i + 2];
    const resPos = input[i + 3];
    if (opCode === 1) {
      input[resPos] = input[valPos1] + input[valPos2];
    } else if (opCode === 2) {
      input[resPos] = input[valPos1] * input[valPos2];
    } else {
      break;
    }
  }
  return input[0];
}
