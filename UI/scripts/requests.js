const signOut = document.getElementById('sign-out');

signOut.addEventListener('click', (event) => {
  event.preventDefault();
  sessionStorage.clear();
  window.location.replace('index.html');
});
