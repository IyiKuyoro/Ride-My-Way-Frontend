var vrBtn = document.getElementsByClassName('vrBtn');
var screen = document.getElementsByClassName('screen');
var rideDetails = document.getElementById('ridedetails');
var closeDetails = document.getElementById('close');

for(i = 0; i < vrBtn.length; i++){
  vrBtn[i].addEventListener('click', function(event){    
    rideDetails.classList.toggle('visibility');
    screen[0].classList.toggle('visibility');
  }, false);
}

closeDetails.addEventListener('click', function(event){
  rideDetails.classList.toggle('visibility');
  screen[0].classList.toggle('visibility');
});
