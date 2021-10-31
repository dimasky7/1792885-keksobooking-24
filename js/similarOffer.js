const templateContent = document.querySelector('#card').content;
const popup = templateContent.querySelector('.popup');
const photoOriginal = popup.querySelector('.popup__photo');
const typeInRussian = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};
const replaceType = function (type) {
  return typeInRussian[type];
};
const drawCard = function (announcement) {
  const newSimilarOffer = popup.cloneNode(true);
  if (announcement.author.avatar) {
    newSimilarOffer.querySelector('.popup__avatar').src = announcement.author.avatar;
  } else {
    newSimilarOffer.querySelector('.popup__avatar').classList.add('hidden');
  }
  if (announcement.offer.title) {
    newSimilarOffer.querySelector('.popup__title').textContent = announcement.offer.title;
  } else {
    newSimilarOffer.querySelector('.popup__title').classList.add('hidden');
  }
  if (announcement.offer.address) {
    newSimilarOffer.querySelector('.popup__text--address').textContent = announcement.offer.address;
  } else {
    newSimilarOffer.querySelector('.popup__text--address').classList.add('hidden');
  }
  if (announcement.offer.price) {
    newSimilarOffer.querySelector('.popup__text--price').textContent = `${announcement.offer.price} ₽/ночь`;
  } else {
    newSimilarOffer.querySelector('.popup__text--price').classList.add('hidden');
  }
  if (announcement.offer.type) {
    newSimilarOffer.querySelector('.popup__type').textContent = replaceType(announcement.offer.type);
  } else {
    newSimilarOffer.querySelector('.popup__type').classList.add('hidden');
  }
  if (announcement.offer.rooms) {
    newSimilarOffer.querySelector('.popup__text--capacity').textContent = `${announcement.offer.rooms} комнаты для ${announcement.offer.guests} гостей`;
  } else {
    newSimilarOffer.querySelector('.popup__text--capacity').classList.add('hidden');
  }
  if (announcement.offer.checkin && announcement.offer.checkout) {
    newSimilarOffer.querySelector('.popup__text--time').textContent = `Заезд после ${announcement.offer.checkin}, выезд до ${announcement.offer.checkout}`;
  } else {
    newSimilarOffer.querySelector('.popup__text--time').classList.add('hidden');
  }
  if (announcement.offer.description) {
    newSimilarOffer.querySelector('.popup__description').textContent = announcement.offer.description;
  } else {
    newSimilarOffer.querySelector('.popup__description').classList.add('hidden');
  }
  //popup__features
  if (announcement.offer.features) {
    newSimilarOffer.querySelectorAll('.popup__feature').forEach((element) => {element.remove();});
    announcement.offer.features.forEach((feature) => {
      newSimilarOffer.querySelector('.popup__features').insertAdjacentHTML('beforeend',
        `<li class="popup__feature popup__feature--${feature}"></li>`);
    });
  } else {
    newSimilarOffer.querySelector('.popup__features').classList.add('hidden');
  }

  //массив фоток жилья
  if (announcement.offer.photos) {
    const photoContainer = newSimilarOffer.querySelector('.popup__photos');
    photoContainer.children[0].remove();
    announcement.offer.photos.forEach((photo) => {
      const newPhoto = photoOriginal.cloneNode(true);
      newPhoto.src = photo;
      photoContainer.appendChild(newPhoto);
    });
  } else {
    newSimilarOffer.querySelector('.popup__photos').classList.add('hidden');
  }

  return newSimilarOffer;
};

export {drawCard};
