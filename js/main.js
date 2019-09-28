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
var map = document.querySelector('.map');
var similarPin = document.querySelector('#pin').content.querySelector('.map__pin');

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

map.classList.remove('map--faded');
