let imageData = require("./input");
// var imageData = "0222112222120000";
var imageWidth = 25;
var imageHeight = 6;

var imageLayers = [];
for (var i = 0; i < imageData.length; i += imageWidth * imageHeight) {
  imageLayers.push(imageData.substr(i, imageWidth * imageHeight));
}
// console.log(imageLayers, "imageLayers");
var message = "";
for (var i = 0; i < imageWidth * imageHeight; i++) {
  var j = 0;
  while (true) {
    // console.log(imageLayers[i], i, "imageLayers[i]");
    if (
      parseInt(imageLayers[j][i]) === 1 ||
      parseInt(imageLayers[j][i]) === 0
    ) {
      message += imageLayers[j][i];
      break;
    } else {
      j++;
    }
  }
}

message = message.replace(/0/g, "⬜");
message = message.replace(/1/g, "⬛");
for (var i = 0; i < message.length; i += imageWidth) {
  console.log(message.substr(i, imageWidth));
}
// console.log(message);
