import './form.js';
import { address } from './form.js';
import {inactivatePage, activateForm, activateFilters} from './pageState.js';
import { drawCard } from './similarOffer.js';
import {mapFiltersForm} from './pageState.js';
import { getData, sendData } from './api.js';
import { offerForm, onSuccessSD, onFailSD } from './functions-for-sendData.js';
const tokioLat = 35.68950;
const tokioLng = 139.69171;
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const housingType = mapFiltersForm.querySelector('#housing-type');
const housingPrice = mapFiltersForm.querySelector('#housing-price');
const housingRooms = mapFiltersForm.querySelector('#housing-rooms');
const housingGuests = mapFiltersForm.querySelector('#housing-guests');
const housingFeatures = mapFiltersForm.querySelector('#housing-features');


inactivatePage();

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup();
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

const getFeaturesFiltersArray = function () {
  const featuresArray = housingFeatures.querySelectorAll('.map__checkbox:checked');
  const featuresArrayOut = Array.from(featuresArray, (input) => input.value);
  return featuresArrayOut;
};

const featuresMatch = function (features, filtersArray) {
  if ((!features) && (filtersArray.length > 0)) {return false;}
  for (let i=0; i < filtersArray.length; i++) {
    if (features.includes(filtersArray[i]) === false) {return false;}
  }
  return true;
};

const success = function (data) {
  data.forEach((announcement) => {
    createMarker(announcement);
  });
  activateFilters();
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
    markerGroup.clearLayers();
    filteredData.forEach((announcement) => {
      createMarker(announcement);
    });
  });
};

const fail = function () {
  const errorInfo = document.createElement('p');
  errorInfo.textContent = '=> Ошибка загрузки данных с сервера!';
  errorInfo.style.color = 'red';
  const errorMessage = document.querySelector('.promo');
  errorMessage.appendChild(errorInfo);
};

const map = L.map('map-canvas');
markerGroup.addTo(map);
map
  .on('load', () => {
    activateForm();
    address.value = `${tokioLat}, ${tokioLng}`;
    getData(success, fail);
    offerForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const formData = new FormData(evt.target);

      sendData(onSuccessSD, onFailSD, formData);

    });
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


export {tokioLat, tokioLng};
export {mainPinIcon, mainPinMarker, map};
