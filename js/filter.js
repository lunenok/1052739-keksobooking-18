'use strict';

(function () {
  var roomsCount = document.querySelector('#housing-rooms');
  var guestsCount = document.querySelector('#housing-guests');
  var roomType = document.querySelector('#housing-type');
  var MAX_PIN_COUNT = 5;
  var DEFAULT_FILTER_VALUE = 'any';

  var filterType = function (item) {
    var selectedType = roomType.options[roomType.selectedIndex].value;
    return selectedType === DEFAULT_FILTER_VALUE ? true : item.offer.type === selectedType;
  };

  var filterByRooms = function (item) {
    return roomsCount.value === DEFAULT_FILTER_VALUE ? true : item.offer.rooms === parseInt(roomsCount.value, 10);
  };

  var filterByGuests = function (item) {
    return guestsCount.value === DEFAULT_FILTER_VALUE ? true : item.offer.guests === parseInt(guestsCount.value, 10);
  };

  var filterData = function (data) {
    return data
      .filter(function (item) {
        return filterType(item) && filterByRooms(item) && filterByGuests(item);
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

})();
