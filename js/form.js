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
  var adForm = document.querySelector('.ad-form');
  var successUploadForm = document.querySelector('#success').content.querySelector('.success');
  var badUploadForm = document.querySelector('#error').content.querySelector('.error');
  var resetButton = document.querySelector('.ad-form__reset');
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

  var changeElementsAvailability = function (elements, status) {
    for (var i = 0; i < elements.length; i++) {
      if (status) {
        elements[i].removeAttribute('disabled');
      } else {
        elements[i].setAttribute('disabled', true);
      }
    }
  };

  var checkGuestValidity = function () {
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

  var reset = function () {
    adForm.reset();
    window.map.setPinDefault();
  };

  var onSuccessWindowEsc = function (evt) {
    evt.preventDefault();
    var successForm = document.querySelector('.success');
    if (evt.keyCode === window.ESC_KEYCODE) {
      successForm.remove();
      reset();
      document.removeEventListener('mousedown', onSuccessWindowMouseDown);
      document.removeEventListener('keydown', onSuccessWindowEsc);
    }
  };

  var onSuccessWindowMouseDown = function (evt) {
    evt.preventDefault();
    var successForm = document.querySelector('.success');
    successForm.remove();
    document.removeEventListener('mousedown', onSuccessWindowMouseDown);
    document.removeEventListener('keydown', onSuccessWindowEsc);
    reset();
  };

  var onUploadSuccess = function () {
    window.map.mapSection.appendChild(successUploadForm);
    reset();
    document.addEventListener('keydown', onSuccessWindowEsc);
    document.addEventListener('mousedown', onSuccessWindowMouseDown);
  };

  var onErrorWindowEsc = function (evt) {
    evt.preventDefault();
    var errorForm = document.querySelector('.error');
    if (evt.keyCode === window.ESC_KEYCODE) {
      errorForm.remove();
      document.removeEventListener('keydown', onErrorWindowEsc);
    }
  };

  var onErrorWindowMouseDown = function (evt) {
    evt.preventDefault();
    var errorForm = document.querySelector('.error');
    errorForm.remove();
    document.removeEventListener('keydown', onErrorWindowEsc);
    document.removeEventListener('mousedown', onErrorWindowMouseDown);
  };

  var onUploadFailed = function (message) {
    var errorWindow = badUploadForm.cloneNode(true);
    var newElement = document.createElement('p');
    var elementBefore = errorWindow.querySelector('.error__message');
    newElement.textContent = message;
    newElement.setAttribute('class', 'error__info');
    elementBefore.parentNode.insertBefore(newElement, elementBefore.nextSibling);
    window.map.mapSection.appendChild(errorWindow);
    document.addEventListener('keydown', onErrorWindowEsc);
    document.addEventListener('mousedown', onErrorWindowMouseDown);
  };

  var onResetClick = function (evt) {
    var existCard = document.querySelector('.map__card');
    evt.preventDefault();
    if (existCard) {
      window.map.mapSection.removeChild(existCard);
    }
    reset();
    window.pin.clearPins();
    window.filter.setFilterDefault();
  };

  var onSubmitClick = function (evt) {
    var existCard = document.querySelector('.map__card');
    evt.preventDefault();
    window.server.upload(new FormData(adForm), onUploadSuccess, onUploadFailed);
    if (existCard) {
      window.map.mapSection.removeChild(existCard);
    }
    // reset();
    window.pin.clearPins();
    window.filter.setFilterDefault();
  };

  adForm.addEventListener('submit', onSubmitClick);

  resetButton.addEventListener('click', onResetClick);

  window.form = {
    checkMinPrice: checkMinPrice,
    changeElementsAvailability: changeElementsAvailability,
    checkGuestValidity: checkGuestValidity
  };
})();
