const input = require("./input").input

let gamma = "";
let epsilon = "";
for (var i = 0; i < input[0].length; i++) {
    let one = 0, zero = 0;
    for (var j = 0; j < input.length; j++) {
        if (input[j][i] === "1") {
            one++
        } else {
            zero++
        }
    }
    if (one > zero) {
        gamma += "1"
        epsilon += "0"
    } else {
        gamma += "0"
        epsilon += "1"
    }
}

console.log(gamma, epsilon, parseInt(gamma, 2) * parseInt(epsilon, 2))

