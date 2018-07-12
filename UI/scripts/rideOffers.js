const rides = document.getElementById('rides');
const cover = document.getElementsByClassName('cover')[0];
const signOut = document.getElementById('sign-out');

fetch('https://iyikuyoro-ride-my-way.herokuapp.com/api/v1/rides', {
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
      cover.style.display = 'none';
      for (let i = 0; i < 16; i += 1) {
        rides.innerHTML += `<div class="ride-card">
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
        </div>`;
      }
    }
  })
  .catch(err => console.log(err));

signOut.addEventListener('click', (event) => {
  event.preventDefault();
  sessionStorage.clear();
  window.location.replace('index.html');
});
