import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
      <div className="card p-0 log-in">
        <div className="card-body p-0">
          <form className="log-in" onSubmit={handleSubmit}>
            <div className="row mb-2">
              <div className="col-12">
                <input type="text" className="form-control form-control-sm username" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-8">
                <input type="password" className="form-control form-control-sm password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              <div className="col-4">
                <button id="log-in-btn" type="submit" className="btn btn-primary btn-sm offset-sm-1">Log in</button>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12">
                <div className="form-check">
                  <label className="form-check-label">
                    <input className="form-check-input" type="checkbox" value="" id="rememberMe" />
                      <span>Remember me</span><span> &#183; </span><a href="#">Forgot password?</a>
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Login;