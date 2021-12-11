let input = require("./input").input

for (var i = 0; i < input[0].length; i++) {
    let one = 0, zero = 0;
    let ones = [], zeros = [];
    for (var j = 0; j < input.length; j++) {
        if (input[j][i] === "1") {
            one++
            ones.push(input[j])
        } else {
            zero++
            zeros.push(input[j])
        }
    }
    if (one >= zero) {
        input = ones
    } else {
        input = zeros
    }
}

const oxygen = input[0];

input = require("./input").input

for (var i = 0; i < input[0].length; i++) {
    let one = 0, zero = 0;
    let ones = [], zeros = [];
    for (var j = 0; j < input.length; j++) {
        if (input[j][i] === "1") {
            one++
            ones.push(input[j])
        } else {
            zero++
            zeros.push(input[j])
        }
    }
    if (one < zero) {
        input = ones
    } else {
        input = zeros
    }

    if (input.length === 1) {
        break
    }
}

const CO2 = input[0]

console.log(parseInt(oxygen, 2) * parseInt(CO2, 2))

