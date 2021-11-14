import { tokioLat, tokioLng } from './main.js';
import {mainPinMarker, map} from './main.js';
import { address } from './form.js';
const offerForm = document.querySelector('.ad-form');

const successContent = document.querySelector('#success').content;
const success = successContent.querySelector('.success');
const body = document.querySelector('body');

const errorContent = document.querySelector('#error').content;
const error = errorContent.querySelector('.error');

const onSuccessSD = function () {
  const isSuccess = success.cloneNode(true);
  body.appendChild(isSuccess);
  const closeSuccessListener = () => {
    document.removeEventListener('click', successDocumentClick);
    document.removeEventListener('keydown', successDocumentEsc);
  };
  function successDocumentClick () {
    isSuccess.remove();
    closeSuccessListener();
  }
  function successDocumentEsc (event) {
    if (event.key === 'Escape') {
      isSuccess.remove();
      closeSuccessListener();
    }
  }
  document.addEventListener('click', successDocumentClick);
  document.addEventListener('keydown', successDocumentEsc);
  map.closePopup();
  offerForm.reset();
  address.value = `${tokioLat}, ${tokioLng}`;
  mainPinMarker.setLatLng({
    lat: tokioLat,
    lng: tokioLng,
  });
};

const onFailSD = function () {
  const isError = error.cloneNode(true);
  const isErrorButton = isError.querySelector('.error__button');
  body.appendChild(isError);
  const closeErrorListener = () => {
    document.removeEventListener('click', errorDocumentClick);
    document.removeEventListener('keydown', errorDocumentEsc);
    isErrorButton.removeEventListener('click', errorButtonClick);
  };
  function errorDocumentClick () {
    isError.remove();
    closeErrorListener();
  }
  function errorDocumentEsc (event) {
    if (event.key === 'Escape') {
      isError.remove();
      closeErrorListener();
    }
  }
  function errorButtonClick () {
    isError.remove();
    closeErrorListener();
  }
  document.addEventListener('click', errorDocumentClick);
  document.addEventListener('keydown', errorDocumentEsc);
  isErrorButton.addEventListener('click', errorButtonClick);
};


export {onSuccessSD, onFailSD, offerForm};