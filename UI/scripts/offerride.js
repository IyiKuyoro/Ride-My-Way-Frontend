const signOut = document.getElementById('sign-out');
const submit = document.getElementsByClassName('button')[0];

// ride data

submit.addEventListener('click', (event) => {
  event.preventDefault();

  const origin = document.getElementById('origin').value;
  const destination = document.getElementById('destination').value;
  const time = document.getElementById('time').value;
  const allowStops = document.getElementById('stops').value;
  const avaliableSpace = document.getElementById('space').value;
  const description = document.getElementById('description').value;

  const post = {
    origin,
    destination,
    time,
    allowStops,
    avaliableSpace,
    description
  };

  fetch('https://iyikuyoro-ride-my-way.herokuapp.com/api/v1/users/rides', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      jwt: sessionStorage.token,
    },
    body: JSON.stringify(post)
  })
    .then(res => res.json())
    .then((data) => {
      const messageContainer = document.getElementById('message-container');
      messageContainer.innerHTML = `<p id="message" class="blue">${data.message}</p>`;

      if (data.status === 'fail') {
        const message = document.getElementById('message');
        message.classList.remove('blue');
        message.classList.add('red');
        origin.value = '';
        destination.value = '';
        time.value = '';
        allowStops.value = '';
        avaliableSpace.value = '';
        description.value = '';

        if (data.message === 'This token is either wrong or has expired') {
          window.location.replace('index.html');
        }
      }
    })
    .catch(err => console.log(err));
});

signOut.addEventListener('click', (event) => {
  event.preventDefault();
  sessionStorage.clear();
  window.location.replace('index.html');
});
