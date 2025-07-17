import React, { useState } from 'react';
import { createUser, signInUser } from '../utils/api';
import { useHistory } from 'react-router-dom';

const Signup = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignup(username, email, password);
  };

  return (
      <div className="card p-0 sign-up">
        <div className="card-body p-0">
          <form className="sign-up" onSubmit={handleSubmit}>
            <div className="row mb-2">
              <div className="col-12 new-to-t">
                <strong>New to Twitter?</strong><span> Sign Up</span>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12">
                <input type="text" className="form-control form-control-sm username" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12">
                <input type="text" className="form-control form-control-sm email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12">
                <input type="password" className="form-control form-control-sm password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12 text-end">
                <button id="sign-up-btn" type="submit" className="btn btn-warning btn-sm">Sign up for Twitter</button>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Signup;