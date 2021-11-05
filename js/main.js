import './form.js';
import './fetchForForm.js';
import { address } from './form.js';
import {inactivatePage, activatePage} from './pageState.js';
import { drawCard } from './similarOffer.js';
const tokioLat = 35.68950;
const tokioLng = 139.69171;

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

////////////////////////Получение данных с сервера///////////////////////////

fetch('https://24.javascript.pages.academy/keksobooking/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error();
  })
  .then((data) => {
    data.forEach((announcement) => {
      const marker = L.marker({
        lat: announcement.location.lat,
        lng: announcement.location.lng,
      },
      {
        icon: pinIcon,
      },
      );

      marker
        .addTo(map)
        .bindPopup(drawCard(announcement));
    });
  })
  .catch(() => {
    const errorInfo = document.createElement('p');
    errorInfo.textContent = '=> Ошибка загрузки данных с сервера!';
    errorInfo.style.color = 'red';
    const errorMessage = document.querySelector('.promo');
    errorMessage.appendChild(errorInfo);
  });

export {tokioLat, tokioLng};
export {mainPinIcon, mainPinMarker, map};
