function handleRegister(form) {
  console.log("HELLO");
  if(form.checkbox.checked) {
    const user = {
      username: form.username.value,
      password: form.password.value,
      email: form.email.value,
    };
    if(user.username && user.password && user.email) {
      fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            alert('Registration successful');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('Please fill in all fields');
    }
  } else {
    alert('Please accept the terms and conditions');
  }
}