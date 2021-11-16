import {offerForm} from './functions-for-sendData.js';

//common constants for activate/inactivate page
const fieldsetHeader = offerForm.querySelector('.ad-form-header');
const fieldsetElements = offerForm.querySelectorAll('.ad-form__element');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFilters = mapFiltersForm.querySelectorAll('.map__filter');
const mapFeaturesFilter = mapFiltersForm.querySelector('#housing-features');

//set inactive state
const inactivatePage = function () {
  fieldsetHeader.setAttribute('disabled', 'disabled');
  fieldsetElements.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'disabled');
  });
  offerForm.classList.add('ad-form--disabled');
  mapFilters.forEach((filter) => {
    filter.setAttribute('disabled', 'disabled');
  });
  mapFeaturesFilter.setAttribute('disabled', 'disabled');
  mapFiltersForm.classList.add('map__filters--disabled');
};

//turn on announcements filters form
const activateFiltersForm = function() {
  mapFilters.forEach((filter) => {
    filter.removeAttribute('disabled');
  });
  mapFeaturesFilter.removeAttribute('disabled');
  mapFiltersForm.classList.remove('map__filters--disabled');
};

//turn on main form fields
const activateForm = function () {
  fieldsetHeader.removeAttribute('disabled');
  fieldsetElements.forEach((fieldset) => {
    fieldset.removeAttribute('disabled');
  });
  offerForm.classList.remove('ad-form--disabled');
};


export {mapFiltersForm, inactivatePage, activateForm, activateFiltersForm};
