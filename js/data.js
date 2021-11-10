import {getRandomInteger, getRandomFloat} from './utils.js';

//Константы
const LATITUDE_MIN = 35.65000;
const LATITUDE_MAX = 35.70000;
const LONGITUDE_MIN = 139.70000;
const LONGITUDE_MAX = 139.80000;
const PRECISION_IN_COORDINATES = 5;
const MIN_PRICE = 1;
const MAX_PRICE = 1000000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 100;
const MIN_GUESTS = 1;
const MAX_GUESTS = 500;

//Массивы
const TYPE_ARRAY = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIME_IN_ARRAY = ['12:00', '13:00', '14:00'];
const TIME_OUT_ARRAY = ['12:00', '13:00', '14:00'];

//Суперфункция для генерации объекта из 3-х других объектов
const fullOffer = function (count) {

  //Массивы для создания объекта offer
  const featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  featuresArray.length = getRandomInteger(1, featuresArray.length);
  const photosArray = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
  photosArray.length = getRandomInteger(1, photosArray.length);

  //Создаем объекты
  const author = {
    avatar: `img/avatars/user${  count  }.png`,
  };

  const location = {
    lat: getRandomFloat(LATITUDE_MIN, LATITUDE_MAX, PRECISION_IN_COORDINATES), // широта
    lng: getRandomFloat(LONGITUDE_MIN, LONGITUDE_MAX, PRECISION_IN_COORDINATES), // долгота
  };

  const offer = {
    title: 'The best offer in Tokio!', //строка — заголовок предложения. Придумал самостоятельно.
    address: `${location.lat  }, ${  location.lng}`,
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
    type: TYPE_ARRAY[getRandomInteger(0, TYPE_ARRAY.length -1)], //случайное значение из массива type[]
    rooms: getRandomInteger(MIN_ROOMS, MAX_ROOMS),
    guests: getRandomInteger(MIN_GUESTS, MAX_GUESTS),
    checkin: TIME_IN_ARRAY[getRandomInteger(0, TIME_IN_ARRAY.length -1)], //одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
    checkout: TIME_OUT_ARRAY[getRandomInteger(0, TIME_OUT_ARRAY.length -1)], //одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
    features: featuresArray, //массив случайной длины из 6 разных фич. При этом, одинаковых зачений в массиве быть не должно.
    description: 'Лучшее место во Вселенной!', //строка — описание помещения. Придумал самостоятельно.
    photos: photosArray, // массив случайной длины из 3 разных ссылок на фотки. При этом, одинаковых зачений в массиве быть не должно.
  };

  return {
    author: author,
    location: location,
    offer: offer,
  };
};

//Функция для генерации массива из 10 объявлений
const createOfferArray = function (quantity) {
  const fullOfferArray = [];
  for (let i=1; i <=quantity; i++) {
    const count = (i < 10)? `0${i}`: i;
    const announcement = fullOffer(count);
    fullOfferArray.push(announcement);
  }
  return fullOfferArray;
};

export {createOfferArray};
