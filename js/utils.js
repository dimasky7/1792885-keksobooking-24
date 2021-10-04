// Функция для получения случайного неотрицательного целого числа из заданного диапазона.
const getRandomInteger = function (min, max) {
  if (min < 0) {
    return 'Диапазон чисел не может быть отрицательным!' ;
  } else if (max <= min) {
    return '2-й аргумент функции должен быть больше первого!';
  }
  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

// Функция для получения случайного неотрицательного вещественного числа из заданного диапазона.
const getRandomFloat = function (min, max, precision) {
  if (min < 0) {
    return 'Диапазон чисел не может быть отрицательным!' ;
  } else if (max <= min) {
    return '2-й аргумент функции должен быть больше первого!';
  }
  const initialNumber = Math.random() * (max - min) +min;
  const fixedNumber = initialNumber.toFixed(precision);
  return Number(fixedNumber);
};

export {getRandomInteger, getRandomFloat};
