//common constants for activate/inactivate page
const form = document.querySelector('.ad-form');
const fieldsetHeader = form.querySelector('.ad-form-header');
const fieldsetElements = form.querySelectorAll('.ad-form__element');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFilters = mapFiltersForm.querySelectorAll('.map__filter');
const mapFeaturesFilter = mapFiltersForm.querySelector('#housing-features');

//set inactive state (function)
const inactivatePage = function () {
  fieldsetHeader.setAttribute('disabled', 'disabled');
  fieldsetElements.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'disabled');
  });
  form.classList.add('ad-form--disabled');
  mapFilters.forEach((filter) => {
    filter.setAttribute('disabled', 'disabled');
  });
  mapFeaturesFilter.setAttribute('disabled', 'disabled');
  mapFiltersForm.classList.add('map__filters--disabled');
};

//set active state (function)
const activatePage = function () {
  fieldsetHeader.removeAttribute('disabled');
  fieldsetElements.forEach((fieldset) => {
    fieldset.removeAttribute('disabled');
  });
  form.classList.remove('ad-form--disabled');
  mapFilters.forEach((filter) => {
    filter.removeAttribute('disabled');
  });
  mapFeaturesFilter.removeAttribute('disabled');
  mapFiltersForm.classList.remove('map__filters--disabled');
};

export {inactivatePage, activatePage};
export {mapFiltersForm};
