let input = require("./Input");
const modifiedInput = {};
input = input.split("\n");
input.forEach(element => {
  const Orbiter = element.split(")")[1];
  const ToOrbit = element.split(")")[0];
  modifiedInput[Orbiter] = ToOrbit;
});
const orbitMap = {};
Object.keys(modifiedInput).forEach(Orbiter => {
  orbitMap[Orbiter] = [];
  calOrbits(modifiedInput[Orbiter], modifiedInput, orbitMap[Orbiter]);
});

function calOrbits(ToOrbit, modifiedInput, orbiterPathArr) {
  if (ToOrbit) {
    orbiterPathArr.push(ToOrbit);
    totalOrbits++;
    calOrbits(modifiedInput[ToOrbit], modifiedInput, orbiterPathArr);
  }
}

const MYOrbitPath = orbitMap["YOU"];
const SANOrbitPath = orbitMap["SAN"];

let reqSteps = 0;
MYOrbitPath.forEach((element, index) => {
  if (SANOrbitPath.indexOf(element) > -1 && reqSteps === 0) {
    reqSteps = SANOrbitPath.indexOf(element) + index;
  }
});
console.log(reqSteps, "reqSteps");
