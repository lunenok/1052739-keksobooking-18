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

    window.cardHandler(id);
  };

  var renderAd = function (ad, index) {
    var pinElement = similarPin.cloneNode(true);

    pinElement.setAttribute('style', 'left:' + ad.location.x + 'px' + '; top:' + ad.location.y + 'px');
    pinElement.setAttribute('alt', ad.offer.title);
    pinElement.querySelector('img').setAttribute('src', ad.author.avatar);
    pinElement.setAttribute('rel', index);

    pinElement.addEventListener('click', onPinClick);

    return pinElement;
  };

  window.pinSuccessHandler = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.DATA.length; i++) {
      fragment.appendChild(renderAd(window.DATA[i], i));
    }
    window.map.appendChild(fragment);
  };
})();
