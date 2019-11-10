'use strict';

(function () {
  var roomsCount = document.querySelector('#housing-rooms');
  var guestsCount = document.querySelector('#housing-guests');
  var roomType = document.querySelector('#housing-type');
  var priceValueInput = document.querySelector('#housing-price');
  var featuresInput = document.querySelector('#housing-features');
  var MAX_PIN_COUNT = 5;
  var DEFAULT_FILTER_VALUE = 'any';
  var PRICE_INTERVALS = {
    any: 'any',
    low: {
      min: 0,
      max: 9999
    },
    middle: {
      min: 10000,
      max: 49999
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };

  var typeFilter = function (item) {
    var selectedType = roomType.options[roomType.selectedIndex].value;
    return selectedType === DEFAULT_FILTER_VALUE ? true : item.offer.type === selectedType;
  };

  var priceFilter = function (item) {
    var selectedPrice = priceValueInput.options[priceValueInput.selectedIndex].value;
    var priceValue = item.offer.price;
    return selectedPrice === PRICE_INTERVALS.any
      ? true
      : priceValue >= PRICE_INTERVALS[selectedPrice].min &&
        priceValue <= PRICE_INTERVALS[selectedPrice].max;
  };

  var roomsFilter = function (item) {
    return roomsCount.value === DEFAULT_FILTER_VALUE ? true : item.offer.rooms === parseInt(roomsCount.value, 10);
  };

  var guestsFilter = function (item) {
    return guestsCount.value === DEFAULT_FILTER_VALUE ? true : item.offer.guests === parseInt(guestsCount.value, 10);
  };

  var featuresFilter = function (item) {
    var checkedFeatures = [].slice.call(featuresInput.querySelectorAll('input[type="checkbox"]:checked'));
    var featuresValue = checkedFeatures.map(function (feature) {
      return feature.value;
    });

    return featuresValue.every(function (feature) {
      return item.offer.features.includes(feature);
    });
  };

  var filterData = function (data) {
    return data
      .filter(function (item) {
        return typeFilter(item) && roomsFilter(item) && guestsFilter(item) && priceFilter(item) && featuresFilter(item);
      })
      .slice(0, MAX_PIN_COUNT);
  };

  window.filter = {
    filterData: filterData
  };

  var onRoomTypeChange = function () {
    window.pin.pinSuccessHandler();
  };

  roomType.addEventListener('change', onRoomTypeChange);

  // Изменение для пул реквеста

})();
