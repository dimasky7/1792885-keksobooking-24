import { tokioLat, tokioLng } from './main.js';
import {mainPinMarker} from './main.js';
const numberOfRooms = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const capacityOptions = capacity.querySelectorAll('option');
const address = document.querySelector('#address');
const reset = document.querySelector('.ad-form__reset');

//initial start
for (let i = 1; i < capacity.length; i++) {
  capacityOptions[i].setAttribute('disabled', 'disabled');
}
address.setAttribute('readonly', true);

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

reset.addEventListener('click', () => {
  address.value = `${tokioLat}, ${tokioLng}`;
  mainPinMarker.setLatLng({
    lat: tokioLat,
    lng: tokioLng,
  });
});


export {address};
