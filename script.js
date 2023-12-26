'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(longitude, latitude);
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];

      const map = L.map('map').setView(coords, 13); // 13 is the nimber of tiles

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // adding an event handler on the map so that when it is clicked a popup a ppears
      map.on('click', function (mapEvent) {
        form.classList.remove('hidden');
        inputDistance.focus();
        // console.log(mapEvent);
        // const { lat, lng } = mapEvent.latlng; // destructuring to get current location on the map
        // L.marker([lat, lng]) // latitude and longitude from the map
        // .addTo(map)
        // .bindPopup(
        //sizing the popup
        // L.popup({
        // maxWidth: 200,
        // minWidth: 100,
        // autoClose: false,
        // closeOnClick: false, // popUp doesnt close whenver clicked
        // className: 'running-popup',
        // })
        // )
        // .setPopupContent('WorkOut') // inrormation displayed when popup appears
        // .openPopup();
      });
    },
    function () {
      alert("we could'nt get your location");
    }
  );

form.addEventListener('submit', function () {
  //display marker
  const { lat, lng } = mapEvent.latlng; // destructuring to get current location on the map
  L.marker([lat, lng]) // latitude and longitude from the map
    .addTo(map)
    .bindPopup(
      //sizing the popup
      L.popup({
        maxWidth: 200,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false, // popUp doesnt close whenver clicked
        className: 'running-popup',
      })
    )
    .setPopupContent('WorkOut') // inrormation displayed when popup appears
    .openPopup();
});
