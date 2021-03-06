import {mapFiltersForm, activateFiltersForm} from './page-state.js';
import {drawCard} from './draw-offer-card.js';
import {debounce} from './debounce.js';
import {getFilteredData} from './filter-offers.js';
const RERENDER_DELAY = 500;
const MAX_NUMBER_OF_OFFERS = 10;

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


const onSuccessGD = function (data) {
  markerGroup.clearLayers();
  data.slice(0, MAX_NUMBER_OF_OFFERS).forEach((announcement) => {
    createMarker(announcement);
  });
  activateFiltersForm();
  mapFiltersForm.addEventListener('change', debounce(() => {
    markerGroup.clearLayers();
    getFilteredData(data).forEach((announcement) => {
      createMarker(announcement);
    });

  }, RERENDER_DELAY));
};

const onFailGD = function () {
  const errorInfo = document.createElement('p');
  errorInfo.textContent = '=> Ошибка загрузки данных с сервера!';
  errorInfo.style.color = 'red';
  const errorMessage = document.querySelector('.promo');
  errorMessage.appendChild(errorInfo);
};


export {onSuccessGD, onFailGD, markerGroup};
