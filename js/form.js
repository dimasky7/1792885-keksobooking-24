const numberOfRooms = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');

//initial start
for (let i = 1; i < capacity.length; i++) {
  capacity.children[i].setAttribute('disabled', 'disabled');
}

//handlers
numberOfRooms.addEventListener('change', () => {
  for (let i=1; i<=3; i++) {
    if (numberOfRooms.value === `${i}`) {
      for (let j=0; j <=3 ; j++) {
        if (j <= i-1) {
          capacity.children[j].removeAttribute('disabled');
        } else {
          capacity.children[j].setAttribute('disabled', 'disabled');
        }
      }
      capacity.value = `${i}`;
    }
  }
  if (numberOfRooms.value === '100') {
    capacity.children[3].removeAttribute('disabled');
    capacity.value = '0';
    for (let i=0; i < capacity.length - 1; i++) {
      capacity.children[i].setAttribute('disabled', 'disabled');
    }
  }
});
