'use strict';

(function () {
  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 87;
  window.map = document.querySelector('.map');
  // var similarPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var mainPin = document.querySelector('.map__pin--main');
  var formElements = document.querySelectorAll('.ad-form__element');
  var mapFilters = document.querySelectorAll('.map__filter');
  var mapFeatures = document.querySelector('.map__features');
  var adressInput = document.querySelector('input[name=address]');
  var roomsNumber = document.querySelector('select[name=rooms]');
  var adFade = document.querySelector('.ad-form ');

  // var renderAd = function (ad) {
  //   var pinElement = similarPin.cloneNode(true);

  //   pinElement.setAttribute('style', 'left:' + ad.location.x + 'px' + '; top:' + ad.location.y + 'px');
  //   pinElement.setAttribute('alt', ad.offer.title);
  //   pinElement.querySelector('img').setAttribute('src', ad.author.avatar);

  //   return pinElement;
  // };

  // var renderAds = function () {
  //   var fragment = document.createDocumentFragment();
  //   for (var i = 0, ads = window.createAds(8); i < ads.length; i++) {
  //     fragment.appendChild(renderAd(ads[i]));
  //   }
  //   return fragment;
  // };

  // map.appendChild(renderAds());

  var activateMap = function (state) {
    if (state) {
      mapFeatures.removeAttribute('disabled');
      adFade.classList.remove('ad-form--disabled');
      window.map.classList.remove('map--faded');
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

  var activateForm = function () {
    window.changeElementsAvailability(formElements, true);
    window.changeElementsAvailability(mapFilters, true);
    activateMap(true);
    setAdress(mainPin);
    window.checkGuestValidity();
  };

  mainPin.addEventListener('mousedown', function () {
    activateForm();
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      activateForm();
    }
  });

  roomsNumber.addEventListener('change', function () {
    window.checkGuestValidity();
  });
})();
