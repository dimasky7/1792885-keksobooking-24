import './form.js';
import { address } from './form.js';
import {inactivatePage, activatePage} from './pageState.js';
import { createOfferArray } from './data.js';
import { drawCard } from './similarOffer.js';

const tokioLat = 35.68950;
const tokioLng = 139.69171;
const offerArray= createOfferArray(10);

inactivatePage();

const map = L.map('map-canvas')
  .on('load', () => {
    activatePage();
    address.value = `${tokioLat}, ${tokioLng}`;
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

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
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

mainPinMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  const precision = 5;
  address.value = `${coordinates.lat.toFixed(precision)}, ${coordinates.lng.toFixed(precision)}`;
});

offerArray.forEach((announcement) => {
  const marker = L.marker({
    lat: announcement.locate.lat,
    lng: announcement.locate.lng,
  },
  {
    icon: pinIcon,
  },
  );

  marker
    .addTo(map)
    .bindPopup(drawCard(announcement));
});
