const range = [356261, 846303];
let validPasswords = 0;

for (var i = range[0]; i <= range[1]; i++) {
  const numArr = i
    .toString()
    .split("")
    .map(digit => parseInt(digit));
  let isAdjecentdigitSame = false;
  let isValidPassword = true;
  for (var d = 0; d < numArr.length; d++) {
    if (d <= 5) {
      if (numArr[d] > numArr[d + 1]) {
        isValidPassword = false;
      }
      if (numArr[d] === numArr[d + 1]) {
        isAdjecentdigitSame = true;
      }
    }
  }
  if (isAdjecentdigitSame && isValidPassword) {
    validPasswords++;
  }
}
console.log(validPasswords);
