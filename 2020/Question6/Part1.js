let input = require("./Input");
let totalOrbits = 0;
const modifiedInput = {};
input = input.split("\n");
input.forEach(element => {
  const Orbiter = element.split(")")[1];
  const ToOrbit = element.split(")")[0];
  modifiedInput[Orbiter] = ToOrbit;
});

Object.keys(modifiedInput).forEach(Orbiter => {
  calOrbits(modifiedInput[Orbiter], modifiedInput);
});
console.log(totalOrbits);

function calOrbits(ToOrbit, modifiedInput) {
  if (ToOrbit) {
    totalOrbits++;
    calOrbits(modifiedInput[ToOrbit], modifiedInput);
  }
}
