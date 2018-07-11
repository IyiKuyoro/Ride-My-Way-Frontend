const signUpError = document.getElementById('signup-message-p');

const helpers = {
  validPassword: (password, confirmPassword) => {
    if (password === confirmPassword) {
      return true;
    }
    signUpError.innerHTML = 'Password must match';
    return false;
  },

  validSignUpData: (data) => {
    // The following regex were gotten from stack over-flow accross several links
    // https://stackoverflow.com/questions/23476532/check-if-string-contains-only-letters-in-javascript
    if (/^[a-zA-Z -]+$/.test(data.firstName)) {
      if (/^[a-zA-Z -]+$/.test(data.lastName)) {
        if (/^[a-zA-Z]+$/.test(data.sex)) {
          // https://stackoverflow.com/questions/5465375/javascript-date-regex-dd-mm-yyyy
          if (/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/.test(data.dob)) {
            if (!isNaN(Number(data.phoneNumber))) {
              // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
              const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if (regex.test(data.emailAddress)) {
                if (typeof data.password === 'string') {
                  return true;
                }
                signUpError.innerHTML = 'password must be a string';
                return false;
              }
              signUpError.innerHTML = 'emailAddress must be an email';
              return false;
            }
            signUpError.innerHTML = 'phoneNumber must be a number';
            return false;
          }
          signUpError.innerHTML = 'dob must be in a this format mm/dd/yy';
          return false;
        }
        signUpError.innerHTML = 'sex must be a string';
        return false;
      }
      signUpError.innerHTML = 'lastName must be a string';
      return false;
    }
    signUpError.innerHTML = 'firstName must be a string';
    return false;
  }
};

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
  const passwordConfirm = document.getElementById('password-confirm').value;

  if (helpers.validPassword(password, passwordConfirm)) {
    const post = {
      firstName,
      lastName,
      sex,
      dob,
      phoneNumber,
      emailAddress,
      password
    };
    if (helpers.validSignUpData(post)) {
      fetch('https://iyikuyoro-ride-my-way.herokuapp.com/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(post)
      })
        .then(res => res.json())
        .then((data) => {
          signUpError.innerHTML = data.message || 'Success!';
          sessionStorage.token = data.data.token;
          window.location.replace('dashboard.html');
        })
        .catch(err => console.log(err));
    }
  }
});
