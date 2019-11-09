'use strict';

(function () {
  var similarPin = document.querySelector('#pin').content.querySelector('.map__pin');

  var onPinClick = function (evt) {
    var id;

    var element = evt.target;

    if (element.tagName === 'IMG') {
      id = element.parentNode.getAttribute('rel');
    } else {
      id = element.getAttribute('rel');
    }

    window.cards.cardHandler(id);
  };

  var renderAd = function (ad, index) {
    var pinElement = similarPin.cloneNode(true);

    pinElement.setAttribute('style', 'left:' + ad.location.x + 'px' + '; top:' + ad.location.y + 'px');
    pinElement.setAttribute('alt', ad.offer.title);
    pinElement.querySelector('img').setAttribute('src', ad.author.avatar);
    pinElement.setAttribute('rel', index);
    pinElement.setAttribute('class', 'map__pin pin__added');

    pinElement.addEventListener('click', onPinClick);

    return pinElement;
  };

  var clearPins = function () {
    var existingPins = document.querySelectorAll('.pin__added');
    [].forEach.call(existingPins, function (element) {
      element.parentNode.removeChild(element);
    });
  };

  var pinSuccessHandler = function () {
    clearPins();
    var fragment = document.createDocumentFragment();
    var elementCount = window.filter.filterData(window.DATA).length;
    for (var i = 0; i < elementCount; i++) {
      fragment.appendChild(renderAd(window.server.getAdByIndex(i), i));
    }
    window.map.mapSection.appendChild(fragment);
  };

  window.pin = {
    pinSuccessHandler: pinSuccessHandler
  };
})();
