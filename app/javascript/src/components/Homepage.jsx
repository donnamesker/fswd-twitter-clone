import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { authenticate, createUser, signInUser } from '../utils/api';
import { useHistory } from 'react-router-dom'; // ✅ React Router v5
import '../homepage.scss';

import background1 from '../../images/background_1.png';
import background2 from '../../images/background_2.png';
import background3 from '../../images/background_3.jpg';

import Navbar from './Navbar';
import Welcome from './Welcome';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const backgrounds = [background2, background3, background1];

const Homepage = () => {
  const [bgIndex, setBgIndex] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    authenticate((res) => {
      //console.log('AUTH RESPONSE:', res);
      //console.log('Homepage response:', res);
      if (!res.authenticated) {
      } else {
        window.location.replace('/feeds');
      }
    });
  }, [history, location.pathname]);


  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  
  const handleLogin = (username, password) => {
    signInUser(
      username,
      password,
      (res) => {
        //console.log('signInUser response:', res);
        //console.log('signInUser response-username:', res.username);
        if (res && res.username) {
          setCurrentUser(res.username);
          history.push('/feeds');
        } else {
          console.error('Invalid login response:', res);
          alert('Login failed');
        }
      },
      (err) => {
        console.error('Login error:', err);
        alert('Login failed');
      }
    );
  };

  const handleSignup = (username, email, password) => {
    createUser(
      username, 
      email, 
      password,
      (res) => {
        handleLogin(username, password); // Auto-login after sign up
      },
      (err) => {
        console.error('Signup failed:', err);
        alert('Signup failed. Try again.');
      }
    )};

  return (
    <div className="homepage" style={{ height: '100vh', position: 'relative' }}>
      <div id="homeback" style={{ backgroundImage: `url(${backgrounds[bgIndex]})` }} />
        <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <div className="auth-box main">
          <div className="row">
              <div className="front-card col-sm-10 offset-sm-1">
                <div className="row">
                  <div className="col-sm-7 welcome">
                    <Welcome />
                  </div>
                  <div className="col-sm-4 offset-sm-1">
                    <LoginForm onLogin={handleLogin} />
                    <SignupForm onSignup={handleSignup} />
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  );
};

export default Homepage;
