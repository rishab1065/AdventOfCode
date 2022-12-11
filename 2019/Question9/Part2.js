let input = require("./input");

input = input.split(",");

input = input.map(element => {
  return parseInt(element);
});

var relativeBase = 0;
for (var i = 0; i < input.length; ) {
  let opCode = input[i];

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
  var para1 = getParamAccToMode(modeForC, input, i + 1, relativeBase);
  var para2 = getParamAccToMode(modeForB, input, i + 2, relativeBase);

  if (opCode === 1) {
    if (modeForA === 0) {
      input[input[i + 3]] = para1 + para2;
    } else if (modeForA === 2) {
      input[relativeBase + input[i + 3]] = para1 + para2;
    } else {
      input[i + 3] = para1 + para2;
    }
    i += 4;
  } else if (opCode === 2) {
    if (modeForA === 0) {
      input[input[i + 3]] = para1 * para2;
    } else if (modeForA === 2) {
      input[relativeBase + input[i + 3]] = para1 * para2;
    } else {
      input[i + 3] = para1 * para2;
    }
    i += 4;
  } else if (opCode === 3) {
    if (modeForC === 0) {
      input[input[i + 1]] = 2;
    } else if (modeForC === 2) {
      input[relativeBase + input[i + 1]] = 2;
    } else {
      input[i + 1] = 2;
    }
    i += 2;
  } else if (opCode === 4) {
    console.log(getParamAccToMode(modeForC, input, i + 1, relativeBase));
    i += 2;
  } else if (opCode === 5) {
    if (para1 !== 0) {
      i = para2;
    } else {
      i += 3;
    }
  } else if (opCode === 6) {
    if (para1 === 0) {
      i = para2;
    } else {
      i += 3;
    }
  } else if (opCode === 7) {
    if (modeForA === 0) {
      input[input[i + 3]] = para1 < para2 ? 1 : 0;
    } else if (modeForA === 2) {
      input[relativeBase + input[i + 3]] = para1 < para2 ? 1 : 0;
    } else {
      input[i + 3] = para1 < para2 ? 1 : 0;
    }
    i += 4;
  } else if (opCode === 8) {
    if (modeForA === 0) {
      input[input[i + 3]] = para1 === para2 ? 1 : 0;
    } else if (modeForA === 2) {
      input[relativeBase + input[i + 3]] = para1 === para2 ? 1 : 0;
    } else {
      input[i + 3] = para1 === para2 ? 1 : 0;
    }
    i += 4;
  } else if (opCode === 9) {
    relativeBase += getParamAccToMode(modeForC, input, i + 1, relativeBase);
    i += 2;
  } else if (opCode === 99) {
    break;
  }
}

function getParamAccToMode(mode, input, index, relativeBase) {
  const para =
    mode === 2
      ? input[input[index] + relativeBase]
      : mode === 0
      ? input[input[index]]
      : input[index];

  return para || 0;
}
