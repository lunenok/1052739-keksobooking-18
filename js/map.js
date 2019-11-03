'use strict';

(function () {
  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 87;
  window.map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var formElements = document.querySelectorAll('.ad-form__element');
  var mapFilters = document.querySelectorAll('.map__filter');
  var mapFeatures = document.querySelector('.map__features');
  var adressInput = document.querySelector('input[name=address]');
  var roomsNumber = document.querySelector('select[name=rooms]');
  var adFade = document.querySelector('.ad-form ');

  window.load.load(window.load.getData, window.load.errorHandler);

  var activateMap = function (state) {
    if (state) {
      mapFeatures.removeAttribute('disabled');
      adFade.classList.remove('ad-form--disabled');
      window.map.classList.remove('map--faded');
      window.form.checkMinPrice();
      window.PinSuccessHandler();
    } else {
      mapFeatures.setAttribute('disabled', true);
    }
  };

  var setAdress = function (pin) {
    var x = pin.offsetTop + Math.floor(PIN_WIDTH / 2);
    var y = pin.offsetLeft + Math.floor(PIN_HEIGHT / 2);
    adressInput.value = 'X: ' + x + ', Y: ' + y;
  };

  window.changeElementsAvailability(formElements, false);
  window.changeElementsAvailability(mapFilters, false);

  var onPressEnter = function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      activateForm();
    }
  };

  var activateForm = function () {
    window.changeElementsAvailability(formElements, true);
    window.changeElementsAvailability(mapFilters, true);
    activateMap(true);
    setAdress(mainPin);
    window.checkGuestValidity();
    mainPin.removeEventListener('mousedown', activateForm);
    mainPin.removeEventListener('keydown', onPressEnter);
  };

  mainPin.addEventListener('mousedown', activateForm);

  mainPin.addEventListener('keydown', onPressEnter);

  roomsNumber.addEventListener('change', function () {
    window.checkGuestValidity();
  });
})();
