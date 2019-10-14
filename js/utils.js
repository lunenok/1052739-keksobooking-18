'use strict';

(function () {
  window.ENTER_KEYCODE = 13;

  var getRandomInterval = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var getRandomFromArray = function (array) {
    return array[getRandomInterval(1, array.length)];
  };

  var shuffleArray = function (array) {
    var randomArray = [];
    var randomCount = getRandomInterval(1, array.length);
    array.sort(function () {
      return 0.5 - Math.random();
    });
    for (var i = 0; i < randomCount; i++) {
      randomArray[i] = array[i];
    }
    return randomArray;
  };

  window.utils = {
    getRandomInterval: getRandomInterval,
    getRandomFromArray: getRandomFromArray,
    shuffleArray: shuffleArray
  };
})();
