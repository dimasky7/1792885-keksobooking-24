const numberOfRooms = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const oneGuest = document.querySelector('#one_guest');
const twoGuests = document.querySelector('#two_guests');
const threeGuests = document.querySelector('#three_guests');
const notForGuests = document.querySelector('#not_for_guests');

//initial start
twoGuests.setAttribute('disabled', 'disabled');
threeGuests.setAttribute('disabled', 'disabled');
notForGuests.setAttribute('disabled', 'disabled');

//handlers
numberOfRooms.addEventListener('change', () => {
  if (numberOfRooms.value === '1') {
    oneGuest.removeAttribute('disabled');
    capacity.value = '1';
    twoGuests.setAttribute('disabled', 'disabled');
    threeGuests.setAttribute('disabled', 'disabled');
    notForGuests.setAttribute('disabled', 'disabled');
  } else if (numberOfRooms.value === '2') {
    oneGuest.removeAttribute('disabled');
    twoGuests.removeAttribute('disabled');
    capacity.value = '2';
    threeGuests.setAttribute('disabled', 'disabled');
    notForGuests.setAttribute('disabled', 'disabled');
  } else if (numberOfRooms.value === '3') {
    oneGuest.removeAttribute('disabled');
    twoGuests.removeAttribute('disabled');
    threeGuests.removeAttribute('disabled');
    capacity.value = '3';
    notForGuests.setAttribute('disabled', 'disabled');
  } else if (numberOfRooms.value === '100') {
    notForGuests.removeAttribute('disabled');
    capacity.value = '0';
    oneGuest.setAttribute('disabled', 'disabled');
    twoGuests.setAttribute('disabled', 'disabled');
    threeGuests.setAttribute('disabled', 'disabled');
  }
});
