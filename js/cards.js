'use strict';

(function () {
  var TypeOffers = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var card = document.querySelector('#card').content.querySelector('.map__card');

  var renderCard = function (index) {
    var cardElement = card.cloneNode(true);
    var similarListPhotos = cardElement.querySelector('.popup__photos');
    var defaultPhoto = cardElement.querySelector('.popup__photo');
    var features = cardElement.querySelector('.popup__features');
    var closeButton = cardElement.querySelector('.popup__close');

    cardElement.querySelector('.popup__title').textContent = window.server.getAdByIndex(index).offer.title;
    cardElement.querySelector('.popup__text--address').textContent = window.server.getAdByIndex(index).offer.adress;
    cardElement.querySelector('.popup__text--price').textContent = window.server.getAdByIndex(index).offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = TypeOffers[window.server.getAdByIndex(index).offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = window.server.getAdByIndex(index).offer.rooms + ' комнаты для ' + window.server.getAdByIndex(index).offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + window.server.getAdByIndex(index).offer.checkin + ', выезд до ' + window.server.getAdByIndex(index).offer.checkout;
    cardElement.querySelector('.popup__description').textContent = window.server.getAdByIndex(index).offer.description;
    cardElement.querySelector('.popup__avatar').setAttribute('src', window.server.getAdByIndex(index).author.avatar);

    var renderFeatures = function () {
      features.innerHTML = '';

      for (var i = 0; i < window.server.getAdByIndex(index).offer.features.length; i++) {
        var newFeature = document.createElement('li');
        newFeature.classList.add('popup__feature', 'popup__feature--' + window.server.getAdByIndex(index).offer.features[i]);
        features.appendChild(newFeature);
      }
    };

    renderFeatures();

    var renderPhoto = function (photoSource) {
      var photoElement = cardElement.querySelector('.popup__photo').cloneNode(true);
      photoElement.setAttribute('src', photoSource);
      return photoElement;
    };

    var addPhoto = function () {
      for (var i = 0; i < window.server.getAdByIndex(index).offer.photos.length; i++) {
        similarListPhotos.appendChild(renderPhoto(window.server.getAdByIndex(index).offer.photos[i]));
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

  var removeCard = function () {
    var existCard = document.querySelector('.map__card');
    if (existCard) {
      window.map.mapSection.removeChild(existCard);
    }
  };

  var cardHandler = function (index) {
    removeCard();
    window.map.mapSection.appendChild(renderCard(index));
  };

  window.cards = {
    cardHandler: cardHandler,
    removeCard: removeCard
  };
})();
