/* eslint-disable react/prop-types */
import React, { Component, useContext, useEffect } from 'react';
import { AuthContext } from './AuthProvider.js';
import axios from 'axios';
import { callBackendAPI } from './api/api.js';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(AuthContext);

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
  );
}

function SubmitButton() {
  return (
    <button className="form-button" type="submit">
      Sign In
    </button>
  );
}

class LoginPage extends Component {
  state = {
    data: null,
  };

  async componentDidMount() {
    try {
      const res = await callBackendAPI();
      this.setState({ data: res.express });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div id="container">
        <LoginForm/>
      </div>
    );
  }
}

export default LoginPage;

// to add into LoginPage at a later date:
// {isLoggedIn ? (
//   <App/>
// ) : (
//   <LoginPage/>
// )}
