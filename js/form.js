'use strict';

(function () {
  var roomsNumber = document.querySelector('select[name=rooms]');
  var guestsNumber = document.querySelector('select[name=capacity]');
  var guestsArray = guestsNumber.querySelectorAll('option');
  var guestsCount = guestsArray.length - 1;
  var roomsMaxCapacity = {
    1: 1,
    2: 2,
    3: 3,
    100: 0
  };

  window.changeElementsAvailability = function (elements, status) {
    for (var i = 0; i < elements.length; i++) {
      if (status) {
        elements[i].removeAttribute('disabled');
      } else {
        elements[i].setAttribute('disabled', true);
      }
    }
  };

  window.checkGuestValidity = function () {
    var rooms = roomsNumber.options[roomsNumber.selectedIndex].value;

    for (var i = 0; i <= guestsCount; i++) {
      guestsArray[i].removeAttribute('disabled');
      guestsArray[i].removeAttribute('selected');
    }

    for (var n = 0; n < guestsArray.length - 1; n++) {
      if (guestsArray[n].value > roomsMaxCapacity[rooms]) {
        guestsArray[n].setAttribute('disabled', true);
        guestsArray[n].removeAttribute('selected', true);
        guestsArray[n + 1].setAttribute('selected', true); // делаем максимальный элемент активным
      }
    }
  };
})();
