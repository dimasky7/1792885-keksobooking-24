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

mainPinMarker.on('moveend', (evt) => {
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
const housingType = mapFiltersForm.querySelector('#housing-type');
const housingPrice = mapFiltersForm.querySelector('#housing-price');
const housingRooms = mapFiltersForm.querySelector('#housing-rooms');
const housingGuests = mapFiltersForm.querySelector('#housing-guests');
const filterWifi = mapFiltersForm.querySelector('#filter-wifi');
const filterDishwasher = mapFiltersForm.querySelector('#filter-dishwasher');
const filterParking = mapFiltersForm.querySelector('#filter-parking');
const filterWasher = mapFiltersForm.querySelector('#filter-washer');
const filterElevator = mapFiltersForm.querySelector('#filter-elevator');
const filterConditioner = mapFiltersForm.querySelector('#filter-conditioner');


const getFeaturesFiltersArray = function () {
  const array = [];
  if (filterWifi.checked) {array.push('wifi');}
  if (filterDishwasher.checked) {array.push('dishwasher');}
  if (filterParking.checked) {array.push('parking');}
  if (filterWasher.checked) {array.push('washer');}
  if (filterElevator.checked) {array.push('elevator');}
  if (filterConditioner.checked) {array.push('conditioner');}
  return array;
};

const featuresMatch = function (features, filtersArray) {
  if (features) {
    let result;
    for (let i = 0; i < filtersArray.length; i++) {
      for (let j = 0; j < features.length; j++) {
        if (! features[j].includes(filtersArray[i])) {
          result = false;
        } else {
          result = true;
          break;
        }
      }
    }
    return result;
  }
  return false;
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
        if (announcement.offer.price < 10000) {
          price = 'low';
        }
        else if (announcement.offer.price >= 10000 && announcement.offer.price <= 50000) {
          price = 'middle';
        }
        else if (announcement.offer.price > 50000) {
          price = 'high';
        }
        const result = (announcement.offer.type === housingType.value || housingType.value === 'any') &&
        (`${announcement.offer.rooms}` === housingRooms.value || housingRooms.value === 'any') &&
        (`${announcement.offer.guests}`=== housingGuests.value || housingGuests.value === 'any') &&
        (price === housingPrice.value || housingPrice.value === 'any') && (featuresMatch(announcement.offer.features, filtersArray1));
        return result;
      });
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
