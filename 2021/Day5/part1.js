const fs = require("fs")

const input = fs.readFileSync("./input.txt", { encoding: 'utf8', flag: 'r' }).trim()
    .split('\n')

let coordinates = [];
input.forEach((element) => {
    const lineCoordinate = element.trim().split("->")
    coordinates.push({
        start: lineCoordinate[0].trim().split(",").map((num) => parseInt(num)),
        end: lineCoordinate[1].trim().split(",").map((num) => parseInt(num))
    })
})
// only consider horizontal and vertical lines
coordinates = coordinates.filter(({ start, end }) => {
    return start[0] === end[0] || start[1] === end[1]
})

let pointsMap = {}


for (var i = 0; i < coordinates.length; i++) {
    const line = coordinates[i]
    let startPoint = false, endPoint = false;
    if (line.start[0] === line.end[0]) {
        startPoint = Math.min(line.start[1], line.end[1])
        endPoint = Math.max(line.start[1], line.end[1])
        while (startPoint <= endPoint) {
            if (pointsMap[`${line.start[0]},${startPoint}`]) {
                pointsMap[`${line.start[0]},${startPoint}`]++;
            } else {
                pointsMap[`${line.start[0]},${startPoint}`] = 1
            }
            startPoint++;
        }
    }
    else if (line.start[1] === line.end[1]) {
        startPoint = Math.min(line.start[0], line.end[0])
        endPoint = Math.max(line.start[0], line.end[0])
        while (startPoint <= endPoint) {
            if (pointsMap[`${startPoint},${line.start[1]}`]) {
                pointsMap[`${startPoint},${line.start[1]}`]++;
            } else {
                pointsMap[`${startPoint},${line.start[1]}`] = 1
            }
            startPoint++;
        }
    }

}


for (var i = 0; i <= 9; i++) {
    let arr = []
    for (var j = 0; j <= 9; j++) {
        arr.push(pointsMap[`${j},${i}`] || ".")
    }
    console.log(arr.join(" "))
}
console.log("\n")
let result = 0
Object.values(pointsMap).forEach((overlapCount) => {
    if (overlapCount > 1)
        result++
})

console.log(result)