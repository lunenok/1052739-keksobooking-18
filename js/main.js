'use sctrict'

var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var checkins = ['12:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var AD_TITLE = 'Предложение №';
var LOCATION_X_MIN = 100;
var LOCATION_X_MAX = 600;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var MIN_PRICE = 5000;
var MAX_PRICE = 12000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 3;
var MIN_GUESTS = 1;
var MAX_GUESTS = 3;


var getRandomInterval = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

var getRandomFromArray = function(array) {
  var arr = array[Math.floor(Math.random() * array.length)];
  return arr;
}

var getRandomArrayFromArray = function(array) {
  var randomArray =[];
  var randomCount = Math.floor(Math.random() * array.length); // Получаем количество элементов будующего случайного массива
  array.sort(function() {
    return 0.5 - Math.random()
  }); // Сортируем входящий массив, чтобы порядок стал случайным
  for (var i = 0; i < randomCount; i++) {
    randomArray[i] = array[i];
  } //Наполняем наш массив случайными элементами из входящего в функцию массива
  return randomArray;
}

var createAd = function(count) {
  var ads = [];
  for (var i = 0; i < count; i ++) {
    var xCoordinate = getRandomInterval(LOCATION_X_MIN, LOCATION_Y_MAX);
    var yCoordinate = getRandomInterval(LOCATION_Y_MAX, LOCATION_Y_MAX);
    var ad = {
      'author': {
        'avatar': 'img/avatars/user' + i + '.png'
      },
      'locataion': {
        x: xCoordinate,
        y: yCoordinate
      },
      'offer': {
        'title': AD_TITLE + ' ' + i,
        'address': xCoordinate + ' ' + yCoordinate,
        'price': getRandomInterval(MIN_PRICE, MAX_PRICE),
        'type': getRandomFromArray(types),
        'rooms': getRandomInterval(MIN_ROOMS, MAX_ROOMS),
        'guests': getRandomInterval(MIN_GUESTS, MAX_GUESTS),
        'checkins': getRandomFromArray(checkins),
        'checkout': getRandomFromArray(checkouts),
        'features': getRandomArrayFromArray(features),
        'description': 'Тут будет описание',
        'photos': getRandomArrayFromArray(photos)
      }
    };
    ads.push(ad);
  }
  return ads;
}

console.log(createAd(8));

