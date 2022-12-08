const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;

async function handleRegister(event) {
  event.preventDefault();
  const form = document.querySelector('#register-form');

  if (form.terms_checkbox.checked) {
    const user = {
      username: form.username.value,
      password: form.password.value,
      email: form.email.value,
    };

    if (user.password.length < 8) {
      alert('Password must be longer than 8 characters');
    }
    if (user.password.length > 72) {
      alert('Password must be less than 72 characters');
    }
    if (user.password.startsWith(' ') || user.password.endsWith(' ')) {
      alert('Password must not start or end with empty spaces');
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(user.password)) {
      alert('Password must contain 1 upper case, lower case, and a number');
    }

    if (user.username && user.password && user.email) {
      const registerRes = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      .then((res) => res.json())
      .then((data) => {
        if(data.error) {
          alert(data.error);
        }
        if(data.token) {
          document.location.replace('/');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Email taken');
      });

      return registerRes;
    } else {
      alert('Please fill in all fields');
    }
  } else {
    alert('Please accept the terms and conditions');
  }
}
