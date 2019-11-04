'use strict';

(function () {
  var card = document.querySelector('#card').content.querySelector('.map__card');

  var TypeOffers = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var renderCard = function (index) {
    var cardElement = card.cloneNode(true);
    var similarListPhotos = cardElement.querySelector('.popup__photos');
    var defaultPhoto = cardElement.querySelector('.popup__photo');
    var features = cardElement.querySelector('.popup__features');
    var closeButton = cardElement.querySelector('.popup__close');

    cardElement.querySelector('.popup__title').textContent = window.DATA[index].offer.title;
    cardElement.querySelector('.popup__text--address').textContent = window.DATA[index].offer.adress;
    cardElement.querySelector('.popup__text--price').textContent = window.DATA[index].offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = TypeOffers[window.DATA[index].offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = window.DATA[index].offer.rooms + ' комнаты для ' + window.DATA[index].offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + window.DATA[index].offer.checkin + ', выезд до ' + window.DATA[index].offer.checkout;
    cardElement.querySelector('.popup__description').textContent = window.DATA[index].offer.description;
    cardElement.querySelector('.popup__avatar').setAttribute('src', window.DATA[index].author.avatar);

    var setFeatures = function () {
      features.innerHTML = '';

      for (var i = 0; i < window.DATA[index].offer.features.length; i++) {
        var newFeature = document.createElement('li');
        newFeature.classList.add('popup__feature', 'popup__feature--' + window.DATA[index].offer.features[i]);
        features.appendChild(newFeature);
      }
    };

    setFeatures();

    var renderPhoto = function (photoSource) {
      var photoElement = cardElement.querySelector('.popup__photo').cloneNode(true);
      photoElement.setAttribute('src', photoSource);
      return photoElement;
    };

    var addPhoto = function () {
      for (var i = 0; i < window.DATA[index].offer.photos.length; i++) {
        similarListPhotos.appendChild(renderPhoto(window.DATA[index].offer.photos[i]));
      }
      similarListPhotos.removeChild(defaultPhoto);
    };

    addPhoto();

    var onCardClose = function (evt) {
      evt.preventDefault();
      cardElement.remove();
      closeButton.removeEventListener('click', onCardClose);
      document.removeEventListener('keydown', onCardEsc);
    };

    var onCardEsc = function (evt) {
      // evt.preventDefault();
      if (evt.keyCode === window.ESC_KEYCODE) {
        cardElement.remove();
        document.removeEventListener('keydown', onCardEsc);
        closeButton.removeEventListener('click', onCardClose);
      }
    };

    document.addEventListener('keydown', onCardEsc);

    closeButton.addEventListener('click', onCardClose);

    return cardElement;
  };

  var cardHandler = function (index) {
    var existCard = document.querySelector('.map__card');
    if (existCard) {
      window.map.mapSection.removeChild(existCard);
    }
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderCard(index));
    window.map.mapSection.appendChild(fragment);
  };

  window.cards = {
    cardHandler: cardHandler
  };
})();
