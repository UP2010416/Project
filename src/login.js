/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import { AuthContext } from './AuthProvider.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  // using AuthContext, login state can be checked
  const { loggedIn, setLoggedIn } = useContext(AuthContext);

  // if the user is logged in already (this is checked with the server) then navigate to products page
  useEffect(() => {
    if (loggedIn) {
      navigate('/products');
    }
  }, [loggedIn, navigate]);

  async function handleLogin(event) {
    event.preventDefault();

    const username = document.querySelector('#username-box').value;
    const password = document.querySelector('#password-box').value;

    console.log(username);
    console.log(password);

    const payload = {
      username,
      password,
    };

    // login post request sent to the server, if credentials are correct, then log in state (from authprovider) is set
    console.log(JSON.stringify(payload));
    try {
      const response = await axios.post('login', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const data = response.data;
        if (data === false) {
          alert('Username or Password is incorrect');
        } else {
          setLoggedIn(true);
          navigate('/products');
          console.log(data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div id = "login-form">
        <form className="form" id="login" onSubmit={handleLogin}>
          <h1 className="form-title">Login</h1>
          <div className="form-boxes">
            <input type="text" className="form-input" id="username-box" autoFocus placeholder="Username"></input>
          </div>
          <div className="form-boxes">
            <input type="password" className="form-input" id="password-box" placeholder="Password"></input>
          </div>
          <SubmitButton handleLogin = {handleLogin} />
        </form>
    </div>
  );
}

function SubmitButton() {
  return (
    <button className="form-button" type="submit">
      Sign In
    </button>
  );
}

export default LoginPage;
