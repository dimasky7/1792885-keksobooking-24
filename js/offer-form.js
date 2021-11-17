import {TOKIO_LAT, TOKIO_LNG, mainPinMarker, map} from './main.js';
import {offerForm} from './functions-for-sendData.js';
import {onSuccessGD, onFailGD} from './functions-for-getData.js';
import {mapFiltersForm} from './page-state.js';
import {getData} from './api.js';
import { previewAvatar } from './preview-photos/avatar.js';
import { previewHousePhotos } from './preview-photos/house-photos.js';
const numberOfRooms = offerForm.querySelector('#room_number');
const capacity = offerForm.querySelector('#capacity');
const capacityOptions = capacity.querySelectorAll('option');
const address = offerForm.querySelector('#address');
const timeIn = offerForm.querySelector('#timein');
const timeOut = offerForm.querySelector('#timeout');
const price = offerForm.querySelector('#price');
const type = offerForm.querySelector('#type');
const reset = offerForm.querySelector('.ad-form__reset');
const FLAT_PRICE = 1000;
const typeMinPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const getMinPrice = function (housingType) {
  return typeMinPrice[housingType];
};

//initial start
for (let i = 1; i < capacity.length; i++) {
  capacityOptions[i].setAttribute('disabled', 'disabled');
}
address.setAttribute('readonly', true);
price.setAttribute('min', FLAT_PRICE);

//handlers
numberOfRooms.addEventListener('change', (evt) => {
  for (let i = 1; i <= numberOfRooms.length; i++) {
    if (i <= evt.target.value) {
      capacityOptions[i-1].removeAttribute('disabled');
    } else {
      capacityOptions[i-1].setAttribute('disabled', 'disabled');
    }

  }

  if (evt.target.value === '100') {
    capacityOptions[numberOfRooms.length -1].removeAttribute('disabled');
    for (let i=0; i < numberOfRooms.length -1; i++) {
      capacityOptions[i].setAttribute('disabled', 'disabled');
    }
    capacity.value = '0';
  }

  if (evt.target.value !== '100') {
    capacity.value = evt.target.value;
  }
});

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

type.addEventListener('change', (event) => {
  price.setAttribute('min', getMinPrice(event.target.value));
  price.setAttribute('placeholder', getMinPrice(event.target.value));
});

reset.addEventListener('click', (event) => {
  event.preventDefault();
  map.closePopup();
  offerForm.reset();
  mapFiltersForm.reset();
  getData(onSuccessGD, onFailGD);
  previewAvatar.src = 'img/muffin-grey.svg';
  if (previewHousePhotos.children[0]) {
    previewHousePhotos.children[0].remove();
  }
  price.setAttribute('min', FLAT_PRICE);
  price.setAttribute('placeholder', FLAT_PRICE);
  address.value = `${TOKIO_LAT}, ${TOKIO_LNG}`;
  mainPinMarker.setLatLng({
    lat: TOKIO_LAT,
    lng: TOKIO_LNG,
  });
});


export {address, price, FLAT_PRICE};
export {mapFiltersForm, onSuccessGD, onFailGD, getData};
