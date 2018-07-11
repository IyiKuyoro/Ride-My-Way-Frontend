var accept = document.getElementsByClassName('accept');
var reject = document.getElementsByClassName('reject');

for(i = 0; i < accept.length; i++){
  accept[i].addEventListener('click', function(event){
    var initT = new Date().getSeconds();
  
    var timer = setInterval(function(){
        var t = new Date().getSeconds();
        if(t - initT === 2){
            message.innerHTML = '<p>You have successfully added <b>Rider Name</b> to the Trip.</p>';
            message.classList.toggle('visibility');
        }
  
        if(t - initT === 5){
            message.classList.toggle('visibility');
            clearInterval(timer);
        }
    }, 1000);
  }, false);
}

for(i = 0; i < reject.length; i++){
  reject[i].addEventListener('click', function(event){
    var initT = new Date().getSeconds();
  
    var timer = setInterval(function(){
        var t = new Date().getSeconds();
        if(t - initT === 2){
            message.innerHTML = '<p>You rejected <b>Rider Name</b>\'s request.</p>';
            message.classList.toggle('visibility');
        }
  
        if(t - initT === 5){
            message.classList.toggle('visibility');
            clearInterval(timer);
        }
    }, 1000);
  }, false);
}




