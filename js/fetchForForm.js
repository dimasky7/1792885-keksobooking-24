import { tokioLat, tokioLng } from './main.js';
import {mainPinMarker, map} from './main.js';
import { address } from './form.js';
const offerForm = document.querySelector('.ad-form');

const successContent = document.querySelector('#success').content;
const success = successContent.querySelector('.success');
const body = document.querySelector('body');

const errorContent = document.querySelector('#error').content;
const error = errorContent.querySelector('.error');

offerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  fetch(
    'https://24.javascript.pages.academy/keksobooking1',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .then(() => {
      const isSuccess = success.cloneNode(true);
      body.appendChild(isSuccess);
      document.addEventListener('click', () => {
        isSuccess.remove();
      });
      document.removeEventListener('click', () => {
        isSuccess.remove();
      });
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          isSuccess.remove();
        }
      });
      document.removeEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          isSuccess.remove();
        }
      });
      map.closePopup();
      offerForm.reset();
      address.value = `${tokioLat}, ${tokioLng}`;
      mainPinMarker.setLatLng({
        lat: tokioLat,
        lng: tokioLng,
      });
    })
    .catch(() => {
      const isError = error.cloneNode(true);
      const isErrorButton = isError.querySelector('.error__button');
      body.appendChild(isError);
      isErrorButton.addEventListener('click', () => {
        isError.remove();
      });
      isErrorButton.removeEventListener('click', () => {
        isError.remove();
      });
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          isError.remove();
        }
      });
      document.removeEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          isError.remove();
        }
      });
      document.addEventListener('click', () => {
        isError.remove();
      });
      document.removeEventListener('click', () => {
        isError.remove();
      });

    });
});

export {offerForm};
