'use strict';

(function () {
  var card = document.querySelector('#card').content.querySelector('.map__card');

  var renderCard = function (cardData) {
    var cardElement = card.cloneNode(true);
    var similarListPhotos = cardElement.querySelector('.popup__photos');
    var defaultPhoto = cardElement.querySelector('.popup__photo');
    var features = cardElement.querySelector('.popup__features');

    var TypeOffers = {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    };

    cardElement.querySelector('.popup__title').textContent = cardData.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = cardData.offer.adress;
    cardElement.querySelector('.popup__text--price').textContent = cardData.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = TypeOffers[cardData.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = cardData.offer.description;
    cardElement.querySelector('.popup__avatar').setAttribute('src', cardData.author.avatar);

    var setFeatures = function () {
      features.innerHTML = '';

      for (var i = 0; i < cardData.offer.features.length; i++) {
        var newFeature = document.createElement('li');
        newFeature.classList.add('popup__feature', 'popup__feature--' + cardData.offer.features[i]);
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
      for (var i = 0; i < cardData.offer.photos.length; i++) {
        similarListPhotos.appendChild(renderPhoto(cardData.offer.photos[i]));
      }
      similarListPhotos.removeChild(defaultPhoto);
    };

    addPhoto();

    return cardElement;
  };

  var successHandler = function (data) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderCard(data[3]));
    window.map.appendChild(fragment);
  };

  window.load(successHandler);
})();
