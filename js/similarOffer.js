import {createOfferArray} from './data.js';

const offerARRAY= createOfferArray(1);
const templateContent = document.querySelector('#card').content;
const popup = templateContent.querySelector('.popup');
const offerField = document.querySelector('#map-canvas');
const photoOriginal = popup.querySelector('.popup__photo');
const replaceType = function (type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель';
  }
};
offerARRAY.forEach((announcement) => {
  const newSimilarOffer = popup.cloneNode(true);
  newSimilarOffer.querySelector('.popup__title').textContent = announcement.offer.title;
  newSimilarOffer.querySelector('.popup__text--address').textContent = announcement.offer.address;
  newSimilarOffer.querySelector('.popup__text--price').textContent = `${announcement.offer.price} ₽/ночь`;
  newSimilarOffer.querySelector('.popup__type').textContent = replaceType(announcement.offer.type);
  newSimilarOffer.querySelector('.popup__text--capacity').textContent = `${announcement.offer.rooms} комнаты для + ${announcement.offer.guests} гостей`;
  newSimilarOffer.querySelector('.popup__text--time').textContent = `Заезд после ${announcement.offer.checkin}, выезд до ${announcement.offer.checkout}`;
  //popup__features
  newSimilarOffer.querySelectorAll('.popup__feature').forEach((element) => {element.remove();});
  announcement.offer.features.forEach((feature) => {
    newSimilarOffer.querySelector('.popup__features').insertAdjacentHTML('beforeend',
      `<li class="popup__feature popup__feature--${feature}"></li>`);
  });

  newSimilarOffer.querySelector('.popup__description').textContent = announcement.offer.description;
  newSimilarOffer.querySelector('.popup__avatar').src = announcement.author.avatar;
  //массив фоток жилья
  const photoContainer = newSimilarOffer.querySelector('.popup__photos');
  photoContainer.children[0].remove();
  announcement.offer.photos.forEach((photo) => {
    const newPhoto = photoOriginal.cloneNode(true);
    newPhoto.src = photo;
    photoContainer.appendChild(newPhoto);
  });

  //вставляем новое объявление в нужное место в разметке страницы
  offerField.appendChild(newSimilarOffer);
});

export {offerARRAY};