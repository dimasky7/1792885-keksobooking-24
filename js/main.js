import './similarOffer.js';

const numberOfRooms = document.querySelector('#room_number');
numberOfRooms.addEventListener('change', function() {
    if (numberOfRooms.value === '2') {
        alert(1);
    }
});
