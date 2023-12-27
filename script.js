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
// making map and mapEven global variables so that they can be accessed nywhere

// let map, mapEvent;

class App {
  #map;
  #mapEvent;
  constructor() {
    this._getPosition();

    form.addEventListener('submit', this._newWorkout.bind(this)); // we use bind because (this) in an event handler points to the element to which it is attatched in our case it is the form element, and we need it to point back to the app class

    //changing from cadence to elevtion gain in the form switching from running to cycling
    inputType.addEventListener('change', this._toggleElevtionField.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("we could'nt get your location");
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(longitude, latitude);

    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    console.log(this);
    this.#map = L.map('map').setView(coords, 13); // 13 is the nimber of tiles $ this.#map is no longer a global variable but an object
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    // adding an event handler on the map so that when it is clicked a popup a ppears(handling clicks on map)
    this.#map.on('click', this._showForm.bind(this)); // the this keyword points to the map and hence we bind so that it can point back to the app object
  } // also the this keyword is the app object

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }
  _toggleElevtionField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }
  _newWorkout(e) {
    e.preventDefault();
    //clearing inputs
    inputCadence.value = inputDistance.value = inputDuration.value = ' ';
    //display marker
    const { lat, lng } = this.#mapEvent.latlng; // destructuring to get current location on the map
    L.marker([lat, lng]) // latitude and longitude from the map
      .addTo(this.#map)
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
  }
}

const app = new App();
app._getPosition(); // getting user location
