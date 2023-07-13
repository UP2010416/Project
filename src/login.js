import React from 'react';

function LoginForm(){
    return (
        <form className="form" id="login">
          <h1 className="form-title">Login</h1>
          <div className="form-boxes">
            <input type="text" className="form-input" autoFocus placeholder="Username"></input>
          </div>
          <div className="form-boxes">
            <input type="text" className="form-input" placeholder="Password"></input>
          </div>
          <SubmitButton/>
        </form>
    );
}

function SubmitButton(){
  function handleClick(){
    
  }
  return (
    <button className="form-button" type="submit" onClick={handleClick}>
      Sign In
    </button>
  );
}

function LoginPage(){
  let content;
  content = <LoginForm/>
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