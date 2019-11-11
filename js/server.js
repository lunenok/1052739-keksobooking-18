'use strict';

(function () {
  var URL__LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_SAVE = 'https://js.dump.academy/keksobooking';
  var XHR_OK_CODE = 200;
  var XHR_TIMEOUT_MAX = 10000;

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL__LOAD);

    xhr.addEventListener('load', function () {
      if (xhr.status === XHR_OK_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = XHR_TIMEOUT_MAX;

    xhr.send();
  };

  var errorHandler = function (errorMessage) {
    var errorWindow = document.querySelector('#error').content.querySelector('.error');
    errorWindow.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorWindow);
  };

  var setAds = function (loadedData) {
    window.DATA = loadedData.filter(function (it) {
      return !!it.offer;
    });
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === XHR_OK_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = XHR_TIMEOUT_MAX;

    xhr.open('POST', URL_SAVE);
    xhr.send(data);
  };

  var getAdByIndex = function (index) {
    var filteredData = window.filter.filterData(window.DATA);
    return filteredData[index];
  };

  window.server = {
    load: load,
    errorHandler: errorHandler,
    setAds: setAds,
    upload: upload,
    getAdByIndex: getAdByIndex
  };

  window.server.load(window.server.setAds, window.server.errorHandler);

})();
