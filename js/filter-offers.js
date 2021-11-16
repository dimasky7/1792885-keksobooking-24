import {mapFiltersForm} from './page-state.js';
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const housingType = mapFiltersForm.querySelector('#housing-type');
const housingPrice = mapFiltersForm.querySelector('#housing-price');
const housingRooms = mapFiltersForm.querySelector('#housing-rooms');
const housingGuests = mapFiltersForm.querySelector('#housing-guests');
const housingFeatures = mapFiltersForm.querySelector('#housing-features');

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

const getFilteredData = function (data) {
  const filtersArray = getFeaturesFiltersArray();
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
            featuresMatch(announcement.offer.features, filtersArray);

    return result;
  });
  return filteredData;
};


export {getFilteredData};
