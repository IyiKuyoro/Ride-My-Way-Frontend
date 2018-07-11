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
