const signOut = document.getElementById('sign-out');
const cover = document.getElementsByClassName('cover')[0];
const rides = document.getElementById('rides');
const screen = document.getElementsByClassName('screen')[0];

const addRequest = (data) => {
  let htmlString = '';

  for (let i = 0; i < data.data.requests.length; i += 1) {
    htmlString += `<li><span class="bold">${data.data.requests[i].requesterName} </span><span>${data.data.requests[i].mobileNumber}</span></li>
    <div id="${data.data.requests[i].id}" class="wrap-container">
      <button class="response-buttons accept">Accept</button>
      <button class="response-buttons decline">Decline</button>
    </div>`;
  }

  return htmlString;
};

const addResponseEventListners = (rideId) => {
  const accept = document.getElementsByClassName('accept');
  const decline = document.getElementsByClassName('decline');

  for (let i = 0; i < accept.length; i += 1) {
    accept[i].addEventListener('click', () => {
      const post = {
        newStatus: 'accepted'
      };

      fetch(`https://iyikuyoro-ride-my-way.herokuapp.com/api/v1/users/rides/${rideId}/requests/${accept[i].parentElement.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          jwt: sessionStorage.token
        },
        body: JSON.stringify(post)
      })
        .then(res => res.json())
        .then((data) => {
          const message = document.getElementById('request-message');
          message.innerHTML = data.message;
        })
        .catch(err => console.log(err));
    });

    decline[i].addEventListener('click', () => {
      const post = {
        newStatus: 'declined'
      };

      console.log(decline[i].parentElement);
      fetch(`https://iyikuyoro-ride-my-way.herokuapp.com/api/v1/users/rides/${rideId}/requests/${decline[i].parentElement.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          jwt: sessionStorage.token
        },
        body: JSON.stringify(post)
      })
        .then(res => res.json())
        .then((data) => {
          const message = document.getElementById('request-message');
          message.innerHTML = data.message;
        })
        .catch(err => console.log(err));
    });
  }
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
      screen.innerHTML = `<div id="request-message"></div>
      <div id="ridedetails">          
        <img id="close" src="./images/icon_close.png">
        <div>
          <h3>Requests</h3>
        </div>
        <ul>
          ${addRequest(data)}
        </ul>
      </div>`;
      addResponseEventListners(rideId);

      const close = document.getElementById('close');
      close.addEventListener('click', () => {
        screen.classList.toggle('visibility');
      });
    })
    .catch(err => console.log(err));
};

const addRequestsbutton = (data, index) => {
  if (data.data.rides[index].requests.length > 0) {
    return '<button class="requests view-requests"">Reqs</button>';
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
          rides.innerHTML += `<div class="ride-card wrap-container request-card">
            <div class= "direction wrap-container">
              <h5>${data.data.rides[i].origin}</h5>
              <img src="./images/icon_to.png">
              <h5>${data.data.rides[i].destination}</h5>
            </div>
            <div id="${data.data.rides[i].id}" class="details wrap-container">
              <div class="time wrap-container">
                <img src="./images/icon_clock.png">
                <h6>${data.data.rides[i].time}</h6>
              </div>
              <div class="seats">
                <img src="./images/icon_seat.png">
                <h6>${data.data.rides[i].avaliableSpace}</h6>
              </div>
              ${addRequestsbutton(data, i)}
            </div>
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
