'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var XHR_OK_CODE = 200;
  var XHR_TIMEOUT_MAX = 10000;

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

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

  window.getData = function (loadedData) {
    window.DATA = loadedData;
  };
})();
