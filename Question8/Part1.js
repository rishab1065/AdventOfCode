let imageData = require("./input");
// var imageData = "123456789012";
var imageWidth = 25;
var imageHeight = 6;
var minZeroCount = 99999999999;
var reqImageLayer = "";
for (var i = 0; i < imageData.length; i += imageWidth * imageHeight) {
  const imageCurrentLayers = imageData.substr(i, imageWidth * imageHeight);
  var zeroCount = 0;
  for (var j = 0; j < imageWidth * imageHeight; j++) {
    if (parseInt(imageCurrentLayers[j]) === 0) {
      zeroCount++;
    }
  }

  if (minZeroCount > zeroCount) {
    minZeroCount = zeroCount;
    reqImageLayer = imageCurrentLayers;
  }
  zeroCount = 0;
}
let numOf1 = 0,
  numOf2 = 0;
for (var k = 0; k < reqImageLayer.length; k++) {
  const num = parseInt(reqImageLayer[k]);

  if (num === 1) {
    numOf1++;
  }
  if (num === 2) {
    numOf2++;
  }
}
console.log(reqImageLayer, numOf2 * numOf1, "reqImageLayer");
