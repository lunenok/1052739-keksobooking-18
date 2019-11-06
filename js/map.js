'use strict';

(function () {
  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 87;
  var MAP_WIDTH = 1200;
  var MAP_HEIGHT = 630;
  var MAP_SKY_Y = 170;
  var DEFAULT_PIN_COORD = {
    x: 570,
    y: 375
  };
  var mapSection = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var formElements = document.querySelectorAll('.ad-form__element');
  var mapFilters = document.querySelectorAll('.map__filter');
  var mapFeatures = document.querySelector('.map__features');
  var adressInput = document.querySelector('input[name=address]');
  var roomsNumber = document.querySelector('select[name=rooms]');
  var adFade = document.querySelector('.ad-form ');

  window.server.load(window.server.setAds, window.server.errorHandler);

  var activateMap = function (state) {
    if (state) {
      mapFeatures.removeAttribute('disabled');
      adFade.classList.remove('ad-form--disabled');
      mapSection.classList.remove('map--faded');
      window.form.checkMinPrice();
      window.pin.pinSuccessHandler();
    } else {
      mapFeatures.setAttribute('disabled', true);
    }
  };

  var setAdress = function (pin) {
    var x = pin.offsetTop + Math.floor(PIN_WIDTH / 2);
    var y = pin.offsetLeft + Math.floor(PIN_HEIGHT / 2);
    adressInput.value = 'X: ' + x + ', Y: ' + y;
  };

  window.form.changeElementsAvailability(formElements, false);
  window.form.changeElementsAvailability(mapFilters, false);

  var onPressEnter = function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      activateForm();
    }
  };

  var activateForm = function () {
    window.form.changeElementsAvailability(formElements, true);
    window.form.changeElementsAvailability(mapFilters, true);
    activateMap(true);
    setAdress(mainPin);
    window.form.checkGuestValidity();
    mainPin.removeEventListener('mousedown', activateForm);
    mainPin.removeEventListener('keydown', onPressEnter);
  };

  var onMovePin = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mainPinPosition = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      var mapCoord = {
        minX: -PIN_WIDTH / 2,
        maxX: MAP_WIDTH - PIN_WIDTH / 2,
        maxY: MAP_HEIGHT,
        minY: MAP_SKY_Y - PIN_HEIGHT
      };

      if (mainPinPosition.x > mapCoord.minX && mainPinPosition.x < mapCoord.maxX) {
        mainPin.style.left = mainPinPosition.x + 'px';
      }
      if (mainPinPosition.y > mapCoord.minY && mainPinPosition.y < mapCoord.maxY) {
        mainPin.style.top = mainPinPosition.y + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (dragged) {
        var onClickPreventDefault = function (evtDragg) {
          evtDragg.preventDefault();
          mainPin.removeEventListener('click', onClickPreventDefault);
        };
        mainPin.addEventListener('click', onClickPreventDefault);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      setAdress(mainPin);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mainPin.addEventListener('mousedown', activateForm);

  mainPin.addEventListener('keydown', onPressEnter);

  mainPin.addEventListener('mousedown', onMovePin);

  roomsNumber.addEventListener('change', function () {
    window.form.checkGuestValidity();
  });

  var setPinDefault = function () {
    mainPin.style.left = DEFAULT_PIN_COORD.x + 'px';
    mainPin.style.top = DEFAULT_PIN_COORD.y + 'px';
    setAdress(mainPin);
  };

  window.map = {
    mapSection: mapSection,
    setPinDefault: setPinDefault
  };
})();
