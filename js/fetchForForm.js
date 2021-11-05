import { tokioLat, tokioLng } from './main.js';
import {mainPinMarker} from './main.js';
import { address } from './form.js';
const offerForm = document.querySelector('.ad-form');

const successContent = document.querySelector('#success').content;
const success = successContent.querySelector('.success');
const body = document.querySelector('body');

const errorContent = document.querySelector('#error').content;
const error = errorContent.querySelector('.error');

const cleanOffer = function () {
  const type = offerForm.querySelector('#type');
  const title = offerForm.querySelector('#title');
  const price = offerForm.querySelector('#price');
  const timeIn = offerForm.querySelector('#timein');
  const timeOut = offerForm.querySelector('#timeout');
  const roomNumber = offerForm.querySelector('#room_number');
  const capacity = offerForm.querySelector('#capacity');
  const description = offerForm.querySelector('#description');
  const features = offerForm.querySelectorAll('.features__checkbox');
  const avatar = offerForm.querySelector('#avatar');
  const images = offerForm.querySelector('#images');

  type.value = 'flat';
  title.value = '';
  address.value = `${tokioLat}, ${tokioLng}`;
  price.value = null;
  timeIn.value = '12:00';
  timeOut.value = '12:00';
  roomNumber.value = '1';
  capacity.value = '1';
  description.value = '';
  avatar.value = null;
  images.value = null;
  for (const feature of features) {
    feature.checked = false;
  }
  mainPinMarker.setLatLng({
    lat: tokioLat,
    lng: tokioLng,
  });

};


offerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  fetch(
    'https://24.javascript.pages.academy/keksobooking',
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
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          isSuccess.remove();
        }
      });
      cleanOffer();
    })
    .catch(() => {
      const isError = error.cloneNode(true);
      const isErrorButton = isError.querySelector('.error__button');
      body.appendChild(isError);
      isErrorButton.addEventListener('click', () => {
        isError.remove();
      });
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          isError.remove();
        }
      });
      document.addEventListener('click', () => {
        isError.remove();
      });

    });
});
