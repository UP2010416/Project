import React, { Component } from 'react';
import axios from 'axios';
import { callBackendAPI } from './api/api.js';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  async function handleLogin() {
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
        if (!data) {
          alert('Username or Password is incorrect');
        } else {
          navigate('/products');
          console.log(data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button className="form-button" type="button" onClick={handleLogin}>
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
