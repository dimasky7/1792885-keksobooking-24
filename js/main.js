import './offer-form.js';
import './preview-photos/avatar.js';
import './preview-photos/house-photos.js';
import {address} from './offer-form.js';
import {inactivatePage, activateForm} from './page-state.js';
import {getData, sendData} from './api.js';
import {markerGroup, onSuccessGD, onFailGD} from './functions-for-getData.js';
import {offerForm, onSuccessSD, onFailSD} from './functions-for-sendData.js';
const TOKIO_LAT = 35.68950;
const TOKIO_LNG = 139.69171;

inactivatePage();

const map = L.map('map-canvas');
markerGroup.addTo(map);
map
  .on('load', () => {
    activateForm();
    address.value = `${TOKIO_LAT}, ${TOKIO_LNG}`;
    getData(onSuccessGD, onFailGD);
  })
  .setView({
    lat: TOKIO_LAT,
    lng: TOKIO_LNG,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: TOKIO_LAT,
    lng: TOKIO_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('move', (evt) => {
  const coordinates = evt.target.getLatLng();
  const precision = 5;
  address.value = `${coordinates.lat.toFixed(precision)}, ${coordinates.lng.toFixed(precision)}`;
});

offerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  sendData(onSuccessSD, onFailSD, formData);

});


export {TOKIO_LAT, TOKIO_LNG, mainPinIcon, mainPinMarker, map};
