'use strict';

(function () {
  var roomsNumber = document.querySelector('select[name=rooms]');
  var guestsNumber = document.querySelector('select[name=capacity]');
  var guestsArray = guestsNumber.querySelectorAll('option');
  var guestsCount = guestsArray.length - 1;
  var headlineInput = document.querySelector('#title');
  var priceInput = document.querySelector('#price');
  var apartamentType = document.querySelector('#type');
  var timeInInput = document.querySelector('#timein');
  var timeOutInput = document.querySelector('#timeout');
  var roomsMaxCapacity = {
    1: 1,
    2: 2,
    3: 3,
    100: 0
  };
  var MIN_PRICE = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
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

  headlineInput.addEventListener('invalid', function () {
    if (headlineInput.validity.tooShort) {
      headlineInput.setCustomValidity('Имя должно состоять минимум из 30 символов');
    } else if (headlineInput.validity.tooLong) {
      headlineInput.setCustomValidity('Имя не должно превышать 1000 символов');
    } else if (headlineInput.validity.valueMissing) {
      headlineInput.setCustomValidity('Обязательное поле');
    } else {
      headlineInput.setCustomValidity('');
    }
  });

  var checkMinPrice = function () {
    var curentType = apartamentType.value;
    var minPrice = MIN_PRICE[curentType];
    priceInput.setAttribute('placeholder', minPrice);
    priceInput.setAttribute('min', minPrice);
  };

  apartamentType.addEventListener('change', checkMinPrice);

  priceInput.addEventListener('invalid', function () {
    var curentType = apartamentType.value;
    if (priceInput.validity.typeMismatch) {
      priceInput.setCustomValidity('Должно быть число');
    } else if (priceInput.validity.rangeOverflow) {
      priceInput.setCustomValidity('Не должно быть больше 1 000 000');
    } else if (priceInput.validity.rangeUnderflow) {
      priceInput.setCustomValidity('Минимальная стоимость для выбранного типа жилья: ' + MIN_PRICE[curentType] + ' руб.');
    } else if (priceInput.validity.valueMissing) {
      priceInput.setCustomValidity('Обязательное поле');
    } else {
      priceInput.setCustomValidity('');
    }
  });

  var syncTime = function (time01, time02) {
    time01.value = time02.value;
  };

  timeInInput.addEventListener('change', function () {
    syncTime(timeOutInput, timeInInput);
  });

  timeOutInput.addEventListener('change', function () {
    syncTime(timeInInput, timeOutInput);
  });

  window.form = {
    checkMinPrice: checkMinPrice
  };
})();
