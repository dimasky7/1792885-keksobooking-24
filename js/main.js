import './form.js';
import { address } from './form.js';
import {inactivatePage, activateForm} from './pageState.js';
import { getData, sendData } from './api.js';
import { success, fail, markerGroup } from './functions-for-getData.js';
import { offerForm, onSuccessSD, onFailSD } from './functions-for-sendData.js';
const tokioLat = 35.68950;
const tokioLng = 139.69171;

inactivatePage();

const map = L.map('map-canvas');
markerGroup.addTo(map);
map
  .on('load', () => {
    activateForm();
    address.value = `${tokioLat}, ${tokioLng}`;
    getData(success, fail);
  })
  .setView({
    lat: tokioLat,
    lng: tokioLng,
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
    lat: tokioLat,
    lng: tokioLng,
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


export {tokioLat, tokioLng};
export {mainPinIcon, mainPinMarker, map};
