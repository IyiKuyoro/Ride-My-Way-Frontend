const signIn = document.getElementById('sign-in-btn');
const message = document.getElementById('message');

signIn.addEventListener('click', (event) => {
  const email = document.getElementById('emailField');
  const password = document.getElementById('passwordField');

  if (email.value !== '' && password.value !== '') {
    // dummy log in
    event.preventDefault();
    window.location.replace('dashboard.html');
  }
});
