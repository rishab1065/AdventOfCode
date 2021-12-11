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
// console.log(coordinates.length, "coordinates")
// only consider horizontal, vertical lines and diagonal line at exactly 45 degrees
coordinates = coordinates.filter(({ start, end }) => {
    const angle = Math.abs(Math.atan2(end[1] - start[1], end[0] - start[0]) * 180.0 / Math.PI);

    return start[0] === end[0] ||
        start[1] === end[1] ||
        45 === angle ||
        angle === 135
})

// console.log(coordinates.length, "coordinates")
let pointsMap = {}


for (var i = 0; i < coordinates.length; i++) {
    const line = coordinates[i]
    let startPoint = false, endPoint = false;

    // horizontal 
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
    // vertical 
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
    // diagonal 1,1 --> 3,3
    else if (line.start[0] === line.start[1] && line.end[0] === line.end[1]) {
        startPoint = Math.min(line.start[0], line.end[0])
        endPoint = Math.max(line.start[0], line.end[0])
        while (startPoint <= endPoint) {
            if (pointsMap[`${startPoint},${startPoint}`]) {
                pointsMap[`${startPoint},${startPoint}`]++;
            } else {
                pointsMap[`${startPoint},${startPoint}`] = 1
            }
            startPoint++;
        }
    } else if (line.start[0] > line.end[0] && line.start[1] < line.end[1]) {
        xCoordinate = line.start[0];
        yCoordinate = line.start[1];

        while (xCoordinate >= line.end[0] && yCoordinate <= line.end[1]) {
            if (pointsMap[`${xCoordinate},${yCoordinate}`]) {
                pointsMap[`${xCoordinate},${yCoordinate}`]++;
            } else {
                pointsMap[`${xCoordinate},${yCoordinate}`] = 1
            }
            xCoordinate--;
            yCoordinate++;
        }
    } else if (line.start[0] < line.end[0] && line.start[1] > line.end[1]) {
        xCoordinate = line.start[0];
        yCoordinate = line.start[1];
        while (xCoordinate <= line.end[0] && yCoordinate >= line.end[1]) {
            if (pointsMap[`${xCoordinate},${yCoordinate}`]) {
                pointsMap[`${xCoordinate},${yCoordinate}`]++;
            } else {
                pointsMap[`${xCoordinate},${yCoordinate}`] = 1
            }
            xCoordinate++;
            yCoordinate--;
        }
    }
    else if (line.start[0] > line.end[0] && line.start[1] > line.end[1]) {
        xCoordinate = line.start[0];
        yCoordinate = line.start[1];
        while (xCoordinate >= line.end[0] && yCoordinate >= line.end[1]) {
            if (pointsMap[`${xCoordinate},${yCoordinate}`]) {
                pointsMap[`${xCoordinate},${yCoordinate}`]++;
            } else {
                pointsMap[`${xCoordinate},${yCoordinate}`] = 1
            }
            xCoordinate--;
            yCoordinate--;
        }
    } else if (line.start[0] < line.end[0] && line.start[1] < line.end[1]) {
        xCoordinate = line.start[0];
        yCoordinate = line.start[1];
        while (xCoordinate <= line.end[0] && yCoordinate <= line.end[1]) {
            if (pointsMap[`${xCoordinate},${yCoordinate}`]) {
                pointsMap[`${xCoordinate},${yCoordinate}`]++;
            } else {
                pointsMap[`${xCoordinate},${yCoordinate}`] = 1
            }
            xCoordinate++;
            yCoordinate++;
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