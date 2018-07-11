const signUp = document.getElementsByClassName('sign-up')[0];

signUp.addEventListener('submit', (event) => {
  event.preventDefault();
  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const sex = document.getElementById('sex').value;
  const dob = document.getElementById('DOB').value;
  const phoneNumber = document.getElementById('phone-number').value;
  const emailAddress = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const post = JSON.stringify({
    firstName,
    lastName,
    sex,
    dob,
    phoneNumber,
    emailAddress,
    password
  });

  fetch('https://iyikuyoro-ride-my-way.herokuapp.com/api/v1/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: post
  })
    .then(res => console.log(res.json()));
});
