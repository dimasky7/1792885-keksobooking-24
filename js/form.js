const numberOfRooms = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const guestsNumber = document.querySelectorAll('.guestsNumber');

//initial start
for (let i = 1; i < guestsNumber.length; i++) {
  guestsNumber[i].setAttribute('disabled', 'disabled');
}

//handlers
numberOfRooms.addEventListener('change', () => {
  for (let i=1; i<=3; i++) {
    if (numberOfRooms.value === `${i}`) {
      for (let j=0; j < i; j++) {
        guestsNumber[j].removeAttribute('disabled');
      }
      capacity.value = `${i}`;
      for (let j=i; j < guestsNumber.length; j++) {
        guestsNumber[j].setAttribute('disabled', 'disabled');
      }
    }
  }
  if (numberOfRooms.value === '100') {
    guestsNumber[3].removeAttribute('disabled');
    capacity.value = '0';
    for (let i=0; i < guestsNumber.length - 1; i++) {
      guestsNumber[i].setAttribute('disabled', 'disabled');
    }
  }
});
