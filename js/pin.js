'use strict';

(function () {
  var similarPin = document.querySelector('#pin').content.querySelector('.map__pin');

  var onPinClick = function (evt, index) {
    var element = evt.target;

    if (element.tagName === 'IMG') {
      var id = element.parentNode.getAttribute('rel')
    } else {
      var id = element.getAttribute('rel');
    }

    console.log(id);

    index(id);
  }

  var renderAd = function (ad, index) {
    var pinElement = similarPin.cloneNode(true);

    pinElement.setAttribute('style', 'left:' + ad.location.x + 'px' + '; top:' + ad.location.y + 'px');
    pinElement.setAttribute('alt', ad.offer.title);
    pinElement.querySelector('img').setAttribute('src', ad.author.avatar);
    pinElement.setAttribute('rel', index);

    pinElement.addEventListener('click', onPinClick);

    return pinElement;
  };

  var successHandler = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderAd(data[i], i));
    }
    window.map.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var errorWindow = document.querySelector('#error').content.querySelector('.error');
    errorWindow.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorWindow);
  };

  window.load(successHandler, errorHandler);
})();
