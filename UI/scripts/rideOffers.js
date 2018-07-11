// var vrBtn = document.getElementsByClassName('vrBtn');
const screen = document.getElementsByClassName('screen');
const rideDetails = document.getElementById('ridedetails');
const closeDetails = document.getElementById('close');

// for(i = 0; i < vrBtn.length; i++){
//   vrBtn[i].addEventListener('click', function(event){
//     rideDetails.classList.toggle('visibility');
//     screen[0].classList.toggle('visibility');
//   }, false);
// }

closeDetails.addEventListener('click', () => {
  rideDetails.classList.toggle('visibility');
  screen[0].classList.toggle('visibility');
});

const rides = document.getElementById('rides');

fetch('https://iyikuyoro-ride-my-way.herokuapp.com/api/v1/rides', {
  method: 'GET',
  headers: {
    jwt: sessionStorage.token
  }
})
  .then(res => res.json())
  .then((data) => {
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
  })
  .catch(err => console.log(err));
