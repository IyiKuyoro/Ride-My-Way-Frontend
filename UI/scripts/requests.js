const signOut = document.getElementById('sign-out');
const cover = document.getElementsByClassName('cover')[0];
const rides = document.getElementById('rides');
const screen = document.getElementsByClassName('screen')[0];

const addRequest = (data) => {
  let htmlString = '';

  for (let i = 0; i < data.data.requests.length; i += 1) {
    htmlString += `<li><span class="bold">${data.data.requests[i].requesterName} </span><span>${data.data.requests[i].mobileNumber}</span></li>
    <button id="accept">Accept</button>
    <button id="decline">Decline</button>`;
  }

  return htmlString;
};

const getRequests = (rideId) => {
  fetch(`https://iyikuyoro-ride-my-way.herokuapp.com/api/v1/users/rides/${rideId}/requests`, {
    method: 'GET',
    headers: {
      jwt: sessionStorage.token
    },
  })
    .then(res => res.json())
    .then((data) => {
      screen.classList.toggle('visibility');
      screen.innerHTML = `<div id="request-details">          
      <img id="close" src="./images/icon_close.png">
      <div>
        <h3>Requests</h3>
      </div>
      <ul>
        ${addRequest(data)}
      </ul>
    </div>`;
    })
    .catch(err => console.log(err));
};

const addRequestsbutton = (data, index) => {
  if (data.data.rides[index].requests.length > 0) {
    return '<button class="requests">Requests</button>';
  }
  return '';
};

fetch('https://iyikuyoro-ride-my-way.herokuapp.com/api/v1/rides', {
  method: 'GET',
  headers: {
    jwt: sessionStorage.token,
  }
})
  .then(res => res.json())
  .then((data) => {
    if (data.status === 'fail') {
      window.location.replace('index.html');
    } else {
      cover.style.display = 'none';
      for (let i = 0; i < data.data.rides.length; i += 1) {
        if (data.data.rides[i].driverId === sessionStorage.userId) {
          rides.innerHTML += `<div id="${data.data.rides[i].id}" class="ride-card">
            <div class= "direction">
              <h5>${data.data.rides[i].origin}</h5>
              <img src="./images/icon_to.png">
              <h5>${data.data.rides[i].destination}</h5>
            </div>
            <div class="time">
              <img src="./images/icon_clock.png">
              <h6>${data.data.rides[i].time}</h6>
            </div>
            <div class="seats">
              <img src="./images/icon_seat.png">
              <h6>${data.data.rides[i].avaliableSpace}</h6>
            </div>
            ${addRequestsbutton(data, i)}
          </div>`;
        }
      }
      const requests = document.getElementsByClassName('requests');
      for (let i = 0; i < requests.length; i += 1) {
        requests[i].addEventListener('click', () => {
          getRequests(requests[i].parentElement.id);
        });
      }
    }
  })
  .catch(err => console.log(err));

signOut.addEventListener('click', (event) => {
  event.preventDefault();
  sessionStorage.clear();
  window.location.replace('index.html');
});
