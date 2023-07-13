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
          <button className="form-button" type="submit">Sign In</button>
        </form>
    );
}

function LoginPage(){
  return (
    <div id="container">
      <LoginForm/>
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