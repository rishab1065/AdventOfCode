let { exampleInput, input } = require("./input")
console.log(exampleInput)

let leastFuel = Number.MAX_SAFE_INTEGER;

let max = Math.max(...input);

for (var i = 0; i < max; i++) {
    const currentPosition = i
    let totalFuel = 0

    for (var j = 0; j < input.length; j++) {
        const diff = Math.abs(currentPosition - input[j])
        totalFuel += (diff * (diff + 1)) / 2
    }

    if (leastFuel > totalFuel) {
        leastFuel = totalFuel
    }
}
console.log(leastFuel, "leastFuel")