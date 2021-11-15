import {mapFiltersForm} from './pageState.js';
import { drawCard } from './similarOffer.js';
import {activateFiltersForm} from './pageState.js';
import {debounce} from './debounce.js';
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const housingType = mapFiltersForm.querySelector('#housing-type');
const housingPrice = mapFiltersForm.querySelector('#housing-price');
const housingRooms = mapFiltersForm.querySelector('#housing-rooms');
const housingGuests = mapFiltersForm.querySelector('#housing-guests');
const housingFeatures = mapFiltersForm.querySelector('#housing-features');

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

const turnOnFilters = function (data) {
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
    filteredData.slice(0, 10).forEach((announcement) => {
      createMarker(announcement);
    });
    //debounce(() => {
      //markerGroup.clearLayers();
      //filteredData.slice(0, 10).forEach((announcement) => {
      //  createMarker(announcement);
      //});
    //}, 500);
  });
};

const success = function (data) {
  data.slice(0, 10).forEach((announcement) => {
    createMarker(announcement);
  });
  activateFiltersForm();
  turnOnFilters(data);
};

const fail = function () {
  const errorInfo = document.createElement('p');
  errorInfo.textContent = '=> Ошибка загрузки данных с сервера!';
  errorInfo.style.color = 'red';
  const errorMessage = document.querySelector('.promo');
  errorMessage.appendChild(errorInfo);
};

export {success, fail, markerGroup};
