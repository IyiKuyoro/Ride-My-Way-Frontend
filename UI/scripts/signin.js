const signIn = document.getElementsByClassName('sign-in')[0];
const signInError = document.getElementById('signin-message');

const validData = (data) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(data.emailAddress.trim())) {
    if (typeof data.password.trim() === 'string') {
      return true;
    }
    signInError.innerHTML = 'password must be a string';
    return false;
  }
  signInError.innerHTML = 'emailAddress must be an email';
  return false;
};

signIn.addEventListener('submit', (event) => {
  event.preventDefault();
  const emailAddress = document.getElementById('emailField').value;
  const password = document.getElementById('passwordField').value;

  const post = {
    emailAddress,
    password
  };

  if (validData(post)) {
    fetch('https://iyikuyoro-ride-my-way.herokuapp.com/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(post)
    })
      .then(res => res.json())
      .then((data) => {
        document.getElementById('emailField').value = '';
        document.getElementById('passwordField').value = '';

        signInError.innerHTML = data.message || '';
        signInError.classList.remove('message-visibility');
        sessionStorage.token = data.data.token;
        sessionStorage.userId = data.data.iD;
        window.location.href = 'rideoffers.html';
      })
      .catch(err => console.log(err));
  }
});
