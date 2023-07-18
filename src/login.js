import React from 'react';
import bcrypt from 'bcrypt';

function LoginForm() {
  return (
        <form className="form" id="login">
          <h1 className="form-title">Login</h1>
          <div className="form-boxes">
            <input type="text" className="form-input" id="username-box" autoFocus placeholder="Username"></input>
          </div>
          <div className="form-boxes">
            <input type="password" className="form-input" id="password-box" placeholder="Password"></input>
          </div>
          <SubmitButton/>
        </form>
  );
}

function SubmitButton() {
  function handleClick() {
    const username = document.querySelector('#username-box').value;
    const password = document.querySelector('#password-box').value;

    bcrypt.genSalt(10, function (err, hash) {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          console.error(err);
          return;
        }

        fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password: hash,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error(error);
          });
      });
    });
  }
  return (
    <button className="form-button" type="submit" onClick={handleClick}>
      Sign In
    </button>
  );
}

function LoginPage() {
  let content;
  content = <LoginForm/>;
  return (
    <div id="container">
      {content}
    </div>
  );
}

export default LoginPage;

// to add into LoginPage at a later date:
// {isLoggedIn ? (
//   <App/>
// ) : (
//   <LoginPage/>
// )}
