let originalInput =
  "3,8,1001,8,10,8,105,1,0,0,21,42,51,76,101,118,199,280,361,442,99999,3,9,101,5,9,9,102,2,9,9,1001,9,4,9,102,2,9,9,4,9,99,3,9,1002,9,3,9,4,9,99,3,9,1002,9,4,9,1001,9,3,9,1002,9,5,9,101,3,9,9,1002,9,2,9,4,9,99,3,9,101,4,9,9,1002,9,2,9,1001,9,3,9,1002,9,3,9,101,4,9,9,4,9,99,3,9,101,3,9,9,1002,9,3,9,101,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,99";
originalInput = originalInput.split(",");

originalInput = originalInput.map(element => {
  return parseInt(element);
});
const allCombinations = [];
function heapPermutation(a, size, n) {
  if (size === 1) {
    allCombinations.push([...a]);
    return;
  }

  for (var i = 0; i < size; i++) {
    heapPermutation(a, size - 1, n);
    if (size % 2 == 1) {
      var temp = a[0];
      a[0] = a[size - 1];
      a[size - 1] = temp;
    } else {
      var temp = a[i];
      a[i] = a[size - 1];
      a[size - 1] = temp;
    }
  }
}
heapPermutation([9, 8, 7, 6, 5], 5, 5);
let maxOutput = -1;
allCombinations.forEach(amplifierSignals => {
  let halt = false;
  let instructionPointer = [0, 0, 0, 0, 0];
  let inputState = [];
  let ampInputs = {};
  ampInputs[amplifierSignals[0]] = [0];
  ampInputs[amplifierSignals[1]] = [];
  ampInputs[amplifierSignals[2]] = [];
  ampInputs[amplifierSignals[3]] = [];
  ampInputs[amplifierSignals[4]] = [];
  while (!halt) {
    const prem = amplifierSignals;
    prem.forEach((element, index) => {
      // console.log(
      //   index,
      //   instructionPointer[index],
      //   element,
      //   ampInputs[element],
      //   // inputState[index],
      //   "dkjvlkdf"
      // );
      outputObj = initComp(
        element,
        ampInputs[element].shift(),
        index,
        inputState,
        instructionPointer
      );
      // console.log(output, "output");
      ampInputs[prem[index === prem.length - 1 ? 0 : index + 1]].push(
        outputObj["output"]
      );
      if (outputObj["output"] > maxOutput) {
        maxOutput = outputObj["output"];
      }
      if (outputObj["opCode"] === 99) {
        halt = true;
      }
    });
  }
});
console.log(maxOutput, "maxOutput");
function initComp(
  amplifierSignal,
  prevOutput,
  index,
  inputState,
  instructionPointer,
  halt
) {
  var output = 0,
    inputNo = inputState[index] ? 1 : 0;
  var input = inputState[index] ? [...inputState[index]] : [...originalInput];
  for (var i = instructionPointer[index]; i < input.length; ) {
    let opCode = input[i];
    // console.log(i, opCode, "input[i]");
    let modeForC = 0,
      modeForB = 0,
      modeForA = 0;

    if (opCode.toString().length === 3) {
      opCode = opCode.toString();
      modeForC = parseInt(opCode[0]);
      opCode = parseInt(opCode[1] + opCode[2]);
    } else if (opCode.toString().length === 4) {
      opCode = opCode.toString();
      modeForC = parseInt(opCode[1]);
      modeForB = parseInt(opCode[0]);
      opCode = parseInt(opCode[2] + opCode[3]);
    } else if (opCode.toString().length === 5) {
      opCode = opCode.toString();
      modeForC = parseInt(opCode[2]);
      modeForB = parseInt(opCode[1]);
      modeForA = parseInt(opCode[0]);
      opCode = parseInt(opCode[3] + opCode[4]);
    }

    if (opCode === 1) {
      var para1 = modeForC === 0 ? input[input[i + 1]] : input[i + 1];
      var para2 = modeForB === 0 ? input[input[i + 2]] : input[i + 2];
      if (modeForA === 0) {
        input[input[i + 3]] = para1 + para2;
      } else {
        input[i + 3] = para1 + para2;
      }
      i += 4;
    } else if (opCode === 2) {
      var para1 = modeForC === 0 ? input[input[i + 1]] : input[i + 1];
      var para2 = modeForB === 0 ? input[input[i + 2]] : input[i + 2];
      if (modeForA === 0) {
        input[input[i + 3]] = para1 * para2;
      } else {
        input[i + 3] = para1 * para2;
      }
      i += 4;
    } else if (opCode === 3) {
      input[input[i + 1]] = inputNo === 0 ? amplifierSignal : prevOutput;
      inputNo = 1;
      i += 2;
    } else if (opCode === 4) {
      output = input[input[i + 1]];
      i += 2;
      instructionPointer[index] = i;
      inputState[index] = [...input];
      return { output, opCode };
    } else if (opCode === 5) {
      var para1 = modeForC === 0 ? input[input[i + 1]] : input[i + 1];
      var para2 = modeForB === 0 ? input[input[i + 2]] : input[i + 2];
      if (para1 !== 0) {
        i = para2;
      } else {
        i += 3;
      }
    } else if (opCode === 6) {
      var para1 = modeForC === 0 ? input[input[i + 1]] : input[i + 1];
      var para2 = modeForB === 0 ? input[input[i + 2]] : input[i + 2];
      if (para1 === 0) {
        i = para2;
      } else {
        i += 3;
      }
    } else if (opCode === 7) {
      var para1 = modeForC === 0 ? input[input[i + 1]] : input[i + 1];
      var para2 = modeForB === 0 ? input[input[i + 2]] : input[i + 2];
      if (modeForA === 0) {
        input[input[i + 3]] = para1 < para2 ? 1 : 0;
      } else {
        input[i + 3] = para1 < para2 ? 1 : 0;
      }
      i += 4;
    } else if (opCode === 8) {
      var para1 = modeForC === 0 ? input[input[i + 1]] : input[i + 1];
      var para2 = modeForB === 0 ? input[input[i + 2]] : input[i + 2];
      if (modeForA === 0) {
        input[input[i + 3]] = para1 === para2 ? 1 : 0;
      } else {
        input[i + 3] = para1 === para2 ? 1 : 0;
      }
      i += 4;
    } else if (opCode === 99) {
      return { output, opCode };
    }
  }
  return { output, opCode };
}
// console.log(input[0]);
