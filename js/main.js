'use strict';

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var AD_TITLE = 'Предложение №';
var LOCATION_X_MIN = 100;
var LOCATION_X_MAX = 1000;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var MIN_PRICE = 5000;
var MAX_PRICE = 12000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 3;
var MIN_GUESTS = 1;
var MAX_GUESTS = 3;
var ENTER_KEYCODE = 13;
var PIN_WIDTH = 65;
var PIN_HEIGHT = 87;
var map = document.querySelector('.map');
var similarPin = document.querySelector('#pin').content.querySelector('.map__pin');
var mainPin = document.querySelector('.map__pin--main');
var formElements = document.querySelectorAll('.ad-form__element');
var mapFilters = document.querySelectorAll('.map__filter');
var mapFeatures = document.querySelector('.map__features');
var adressInput = document.querySelector('input[name=address]');
var roomsNumber = document.querySelector('select[name=rooms]');
var guestsNumber = document.querySelector('select[name=capacity]');
var adFade = document.querySelector('.ad-form ');
var guestsArray = guestsNumber.querySelectorAll('option');
var guestsCount = guestsArray.length - 1;
var roomsMaxCapacity = {
  1: 1,
  2: 2,
  3: 3,
  100: 0
};

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

var createAds = function (count) {
  var ads = [];
  for (var i = 0; i < count; i++) {
    var xCoordinate = getRandomInterval(LOCATION_X_MIN, LOCATION_X_MAX);
    var yCoordinate = getRandomInterval(LOCATION_Y_MIN, LOCATION_Y_MAX);
    var adElement = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'location': {
        x: xCoordinate,
        y: yCoordinate
      },
      'offer': {
        'title': AD_TITLE + ' ' + i,
        'address': xCoordinate + ' ' + yCoordinate,
        'price': getRandomInterval(MIN_PRICE, MAX_PRICE),
        'type': getRandomFromArray(TYPES),
        'rooms': getRandomInterval(MIN_ROOMS, MAX_ROOMS),
        'guests': getRandomInterval(MIN_GUESTS, MAX_GUESTS),
        'checkins': getRandomFromArray(CHECKINS),
        'checkout': getRandomFromArray(CHECKOUTS),
        'features': shuffleArray(FEATURES),
        'description': 'Тут будет описание',
        'photos': shuffleArray(PHOTOS)
      }
    };
    ads.push(adElement);
  }
  return ads;
};

var renderAd = function (ad) {
  var pinElement = similarPin.cloneNode(true);

  pinElement.setAttribute('style', 'left:' + ad.location.x + 'px' + '; top:' + ad.location.y + 'px');
  pinElement.setAttribute('alt', ad.offer.title);
  pinElement.querySelector('img').setAttribute('src', ad.author.avatar);

  return pinElement;
};

var renderAds = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0, ads = createAds(8); i < ads.length; i++) {
    fragment.appendChild(renderAd(ads[i]));
  }
  return fragment;
};

map.appendChild(renderAds());

var changeElementsAvailability = function (elements, status) {
  for (var i = 0; i < elements.length; i++) {
    if (status) {
      elements[i].removeAttribute('disabled');
    } else {
      elements[i].setAttribute('disabled', true);
    }
  }
};

var activateMap = function (state) {
  if (state) {
    mapFeatures.removeAttribute('disabled');
    adFade.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
  } else {
    mapFeatures.setAttribute('disabled', true);
  }
};

var setAdress = function (pin) {
  var x = pin.offsetTop + Math.floor(PIN_WIDTH / 2);
  var y = pin.offsetLeft + Math.floor(PIN_HEIGHT / 2);
  adressInput.value = 'X: ' + x + ', Y: ' + y;
};

changeElementsAvailability(formElements, false);
changeElementsAvailability(mapFilters, false);

var activateForm = function () {
  changeElementsAvailability(formElements, true);
  changeElementsAvailability(mapFilters, true);
  activateMap(true);
  setAdress(mainPin);
  checkGuestValidity();
};

mainPin.addEventListener('mousedown', function () {
  activateForm();
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activateForm();
  }
});

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

roomsNumber.addEventListener('change', function () {
  checkGuestValidity();
});
