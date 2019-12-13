const range = [356261, 846303];
let validPasswords = 0;

for (var i = range[0]; i <= range[1]; i++) {
  const numArr = i
    .toString()
    .split("")
    .map(digit => parseInt(digit));
  let isAdjecentdigitSame = false;
  let isValidPassword = true;
  let freqObj = {};
  for (var d = 0; d < numArr.length; d++) {
    if (d <= 5) {
      if (numArr[d] > numArr[d + 1]) {
        isValidPassword = false;
      }
      if (numArr[d] === numArr[d + 1]) {
        isAdjecentdigitSame = true;
      }

      freqObj[numArr[d]] = freqObj[numArr[d]] ? freqObj[numArr[d]] + 1 : 1;
    }
  }
  if (isAdjecentdigitSame && isValidPassword) {
    let hasNumPair = false;
    Object.keys(freqObj).map((value, key) => {
      if (freqObj[value] === 2) {
        hasNumPair = true;
      }
    });
    if (hasNumPair) {
      validPasswords++;
    }
  }
}
console.log(validPasswords);
