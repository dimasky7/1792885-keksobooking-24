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

const typeMatch = function (type) {
  return (type === housingType.value || housingType.value === 'any');
};
const roomsMatch = function (rooms) {
  return (rooms === housingRooms.value || housingRooms.value === 'any');
};
const guestsMatch = function (guests) {
  return (guests === housingGuests.value || housingGuests.value === 'any');
};
const priceMatch = function (priceParam) {
  return (priceParam === housingPrice.value || housingPrice.value === 'any');
};

const featuresMatch = function (features, filtersArray) {
  if ((!features) && (filtersArray.length > 0)) {return false;}
  for (let i=0; i < filtersArray.length; i++) {
    if (!features.includes(filtersArray[i])) {return false;}
  }
  return true;
};

const getFilteredData = function (data) {
  const filtersArray = getFeaturesFiltersArray();
  const filteredData = [];
  for (let i = 0; i < data.length; i++) {
    let price = '';
    if (data[i].offer.price < LOW_PRICE) {
      price = 'low';
    }
    else if (data[i].offer.price >= LOW_PRICE && data[i].offer.price <= HIGH_PRICE) {
      price = 'middle';
    }
    else if (data[i].offer.price > HIGH_PRICE) {
      price = 'high';
    }
    const result = typeMatch(data[i].offer.type) && roomsMatch(`${data[i].offer.rooms}`) && guestsMatch(`${data[i].offer.guests}`) && priceMatch(price) &&
            featuresMatch(data[i].offer.features, filtersArray);

    if (result === true) {
      filteredData.push(data[i]);
    }
    if (filteredData.length === 10) {
      break;
    }
  }
  return filteredData;
};


export {getFilteredData};
