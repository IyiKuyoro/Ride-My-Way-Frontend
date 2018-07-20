// Save DOM elements to be manipulated
const rides = document.getElementById('rides');
const cover = document.getElementsByClassName('cover')[0];
const signOut = document.getElementById('sign-out');
const screen = document.getElementsByClassName('screen')[0];
const backButton = document.getElementById('back');
const nextButton = document.getElementById('next');
const fromFilter = document.querySelector('.from-filter');
const toFilter = document.querySelector('.to-filter');

let savedRides = []; // Array to hold ride offers returned by the server
let filteredRides = []; // Array to hold filtered rides
const origins = {};
const destinations = {};
let noOfPages = 0; // The max number of pages
let curPage = 0;

const getSpecificRide = (rideId) => {
  fetch(`https://iyikuyoro-ride-my-way.herokuapp.com/api/v1/rides/${rideId}`, {
    method: 'GET',
    headers: {
      jwt: sessionStorage.token
    }
  })
    .then(res => res.json())
    .then((data) => {
      if (data.status === 'fail') {
        window.location.replace('index.html');
      } else {
        screen.classList.toggle('visibility');
        screen.innerHTML = `<div id="request-message"></div>
        <div id="ridedetails">          
          <img id="close" src="./images/icon_close.png">
          <div>
            <h3>${data.data.ride.driverName}</h3>
          </div>
          <ul>
            <li><span>From: </span><span class="bold">${data.data.ride.origin}</span></li>
            <li><span>To: </span><span class="bold">${data.data.ride.destination}</span></li>
            <li><span>Time: </span><span class="bold">${data.data.ride.time}</span></li>
            <li><span>Space: </span><span class="bold">${data.data.ride.avaliableSpace}</span></li>
            <li><span>Will Stop? </span><span class="bold">${data.data.ride.allowStops}</span></li>
            <li>
              <p>Proposed Route: </p>
              <p class="bold">${data.data.ride.description}</p>
            </li>
          </ul>
          <button id="request-ride">Request</button>
        </div>`;
      }

      const close = document.getElementById('close');
      close.addEventListener('click', () => {
        screen.classList.toggle('visibility');
      });

      const requestRide = document.getElementById('request-ride');
      requestRide.addEventListener('click', () => {
        fetch(`https://iyikuyoro-ride-my-way.herokuapp.com/api/v1/rides/${rideId}/requests`, {
          method: 'POST',
          headers: {
            jwt: sessionStorage.token,
            'Content-Type': 'application/json; charset=utf-8'
          },
        })
          .then(res => res.json())
          .then((inData) => {
            // Display message and close the details
            const requestMessage = document.getElementById('request-message');
            requestMessage.innerHTML = inData.message;
          })
          .catch(err => console.log(err));
      });
    })
    .catch(err => console.log(err));
};

const displayPages = () => {
  backButton.classList.remove('visibility');
  nextButton.classList.remove('visibility');
  // Manipulate the pages buttons visibility
  if (curPage === 1) {
    backButton.classList.add('visibility');
    if (noOfPages === 1) {
      nextButton.classList.add('visibility');
    }
  } else if (curPage > 1 && noOfPages === curPage) {
    nextButton.classList.add('visibility');
  }
};

const addViewRideEventHandler = () => {
  const view = document.getElementsByClassName('view');
  for (let i = 0; i < view.length; i += 1) {
    view[i].addEventListener('click', () => {
      getSpecificRide(view[i].parentElement.id);
    });
  }
};

const displayRides = (ridesArray) => {
  rides.innerHTML = '';
  noOfPages = Math.ceil(ridesArray.length / 16);
  const firstRideOnPage = ((curPage - 1) * 16);
  const noOfRidesLeft = ridesArray.length - firstRideOnPage;

  // Load 16 rides to the page
  for (let i = firstRideOnPage; i < (noOfRidesLeft >= 16 ? (16 + firstRideOnPage) : (noOfRidesLeft + firstRideOnPage)); i += 1) {
    rides.innerHTML += `<div id="${ridesArray[i].id}" class="ride-card wrap-container">
      <div class= "direction wrap-container">
        <h5>${ridesArray[i].origin}</h5>
        <img src="./images/icon_to.png">
        <h5>${ridesArray[i].destination}</h5>
      </div>
      <div class="details wrap-container">
        <div class="time">
          <img src="./images/icon_clock.png">
          <h6>${ridesArray[i].time}</h6>
        </div>
        <div class="seats">
          <img src="./images/icon_seat.png">
          <h6>${ridesArray[i].avaliableSpace}</h6>
        </div>
      </div>
      <button class="view">View</button>
    </div>`;
  }
  addViewRideEventHandler();
  displayPages();
};

const saveOriginsAndDestinations = () => {
  savedRides.forEach((element) => {
    if (!origins[element.origin]) {
      const opt = document.createElement('option');

      opt.text = element.origin;
      opt.value = element.origin;

      fromFilter.add(opt);
      origins[element.origin] = 1;
    }

    if (!destinations[element.destination]) {
      const opt = document.createElement('option');

      opt.text = element.destination;
      opt.value = element.destination;

      toFilter.add(opt);
      destinations[element.destination] = 1;
    }
  });
};

// Get all rides from the server
fetch('https://iyikuyoro-ride-my-way.herokuapp.com/api/v1/rides', {
  method: 'GET',
  headers: {
    jwt: sessionStorage.token
  }
})
  .then(res => res.json())
  .then((data) => {
    if (data.status === 'fail') {
      // If status of request is fail, redirect the user to the login page
      window.location.replace('index.html');
    } else {
      cover.style.display = 'none'; // Remove the cover screen and load all the rides into an array
      savedRides = data.data.rides;
      filteredRides = savedRides;
      saveOriginsAndDestinations();
      curPage = 1;
      displayRides(filteredRides); // Display the first page of rides
    }
  })
  .catch(err => console.log(err));

// Add event listner to the signout button
signOut.addEventListener('click', (event) => {
  event.preventDefault();
  sessionStorage.clear();
  window.location.replace('index.html');
});

backButton.addEventListener('click', () => {
  curPage -= 1;
  displayRides(filteredRides);
});

nextButton.addEventListener('click', () => {
  curPage += 1;
  displayRides(filteredRides);
});

const filterFunction = () => {
  filteredRides = [];

  savedRides.forEach((element) => {
    if (fromFilter.value !== 'all' && toFilter.value !== 'all') {
      if (element.origin === fromFilter.value && element.destination === toFilter.value) {
        filteredRides.push(element);
      }
    } else if (fromFilter.value === 'all' && toFilter.value !== 'all') {
      if (element.destination === toFilter.value) {
        filteredRides.push(element);
      }
    } else if (fromFilter.value !== 'all' && toFilter.value === 'all') {
      if (element.origin === fromFilter.value) {
        filteredRides.push(element);
      }
    } else if (fromFilter.value === 'all' && toFilter.value === 'all') {
      filteredRides.push(element);
    }
  });

  curPage = 1;
  displayRides(filteredRides);
};

fromFilter.addEventListener('input', () => {
  filterFunction();
});
toFilter.addEventListener('input', () => {
  filterFunction();
});
