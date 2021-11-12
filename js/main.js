import './form.js';
import './fetchForForm.js';
import { address } from './form.js';
import {inactivatePage, activatePage} from './pageState.js';
import { drawCard } from './similarOffer.js';
import {mapFiltersForm} from './pageState.js';
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

mainPinMarker.on('move', (evt) => {
  const coordinates = evt.target.getLatLng();
  const precision = 5;
  address.value = `${coordinates.lat.toFixed(precision)}, ${coordinates.lng.toFixed(precision)}`;
});

const markerGroup = L.layerGroup().addTo(map);
const createMarker = (announcement) => {
  const marker = L.marker(
    {
      lat: announcement.location.lat,
      lng: announcement.location.lng,
    },
    {
      icon: pinIcon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(drawCard(announcement));
};
////////////////////////Получение данных с сервера///////////////////////////
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const housingType = mapFiltersForm.querySelector('#housing-type');
const housingPrice = mapFiltersForm.querySelector('#housing-price');
const housingRooms = mapFiltersForm.querySelector('#housing-rooms');
const housingGuests = mapFiltersForm.querySelector('#housing-guests');
const housingFeatures = mapFiltersForm.querySelector('#housing-features');

const getFeaturesFiltersArray = function () {
const featuresArray = housingFeatures.querySelectorAll('.map__checkbox:checked');
const featuresArrayOut = Array.from(featuresArray, input => input.value);
return featuresArrayOut;
};

const featuresMatch = function (features, filtersArray) {
  if ((!features) && (filtersArray.length > 0)) {return false;}
  for (let i=0; i < filtersArray.length; i++) {
    if (features.includes(filtersArray[i]) === false) {return false;}
  }
  return true;
};

fetch('https://24.javascript.pages.academy/keksobooking/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error();
  })
  .then((data) => {
    data.forEach((announcement) => {
      createMarker(announcement);
    });
    mapFiltersForm.addEventListener('change', () => {

      const filtersArray1 = getFeaturesFiltersArray();
      const filteredData = data.filter((announcement) => {
        let price = '';
        if (announcement.offer.price < LOW_PRICE) {
          price = 'low';
        }
        else if (announcement.offer.price >= LOW_PRICE && announcement.offer.price <= HIGH_PRICE) {
          price = 'middle';
        }
        else if (announcement.offer.price > HIGH_PRICE) {
          price = 'high';
        }
        const typeMatch = function () {
          return (announcement.offer.type === housingType.value || housingType.value === 'any');
        };
        const roomsMatch = function () {
          return (`${announcement.offer.rooms}` === housingRooms.value || housingRooms.value === 'any');
        };
        const guestsMatch = function () {
          return (`${announcement.offer.guests}`=== housingGuests.value || housingGuests.value === 'any');
        };
        const priceMatch = function () {
          return (price === housingPrice.value || housingPrice.value === 'any');
        };
        const result = typeMatch() && roomsMatch() && guestsMatch() && priceMatch() &&
        featuresMatch(announcement.offer.features, filtersArray1);

        return result;
      });
      console.log(filteredData);
      markerGroup.clearLayers();
      filteredData.forEach((announcement) => {
        createMarker(announcement);
      });
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
