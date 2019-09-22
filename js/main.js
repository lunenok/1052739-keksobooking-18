'use sctrict'

var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var checkins = ['12:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00'];

var createRandomInterval = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

var getRandomFromArray = function(array) {
  var arr = array[Math.floor(Math.random() * array.length)];
  return arr;
}









// var createWizzards = function () {
//   for (var i = 0, wizards = []; i < 4; i++) {
//     wizards.push({
//       name: wizardsNames[Math.floor(Math.random() * wizardsNames.length)],
//       secondName: wizardsSecondNames[Math.floor(Math.random() * wizardsSecondNames.length)],
//       coatColor: wizardsCoatColor[Math.floor(Math.random() * wizardsCoatColor.length)],
//       eyesColor: wizardsEyesColor[Math.floor(Math.random() * wizardsEyesColor.length)]
//     });
//   }
//   return wizards;
// };
