let { input } = require("./input")

let fuelMap = {}
let leastFuel = Number.MAX_SAFE_INTEGER;

for (var i = 0; i < input.length; i++) {
    const currentPosition = input[i]
    let totalFuel = 0
    if (fuelMap[input[i]]) {
        continue
    }
    for (var j = 0; j < input.length; j++) {

        totalFuel += Math.abs(currentPosition - input[j])
    }
    fuelMap[input[i]] = totalFuel;
    if (leastFuel > totalFuel) {
        leastFuel = totalFuel
    }
}
console.log(leastFuel, "leastFuel")