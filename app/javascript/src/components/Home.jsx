import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router-dom';
import { authenticate, createUser, signInUser } from '../utils/api';
import '../homepage.scss';

import HomeNav from './HomeNav';
import Login from './Login';
import Signup from './Signup';

import background1 from '../../images/background_1.png';
import background2 from '../../images/background_2.png';
import background3 from '../../images/background_3.jpg';

const backgrounds = [background2, background3, background1];


const Home = () => {
  const [bgIndex, setBgIndex] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const hasRedirected = useRef(false);
/*
  useEffect(() => {
  if (hasRedirected.current) return; // prevent loop
  hasRedirected.current = true;

  authenticate((res) => {

      console.log('AUTH RESPONSE:', res);
      console.log('Homepage response:', res);
    if (res.authenticated) {
      history.replace('/feeds'); // avoid full page reload
    }
  });
}, [history]);
*/
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
        if (res && username) {
          setCurrentUser(username);
          //history.push('/feeds');
          window.location.replace('/feeds');
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
    <div>
        <div id="homeback"></div>
        <HomeNav />
        <div className="main">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="front-card col-sm-10 col-sm-offset-1">
                        <div className="row justify-content-center">
                            <div className="col-sm-6 welcome">
                                <div id="welcome-text">
                                    <h1><strong>Welcome to Twitter.</strong></h1>
                                    <p>Connect with your friends &#8212; and other fascinating people. Get in-the-moment updates on the things that interest you. And watch events unfold, in real time, from every angle.</p>
                                </div>
                                <p><a href="#" id="twit-info">Hack Pacific - Backendium Twitter Project</a></p>
                                <p><a href="#" id="twit-account">Tweet and photo by @Hackpacific<br />3:20 PM - 15 December 2016</a></p>
                            </div>
                            <div className="col-sm-4 col-sm-offset-1">
                                <Login onLogin={handleLogin} />
                                <Signup onSignup={handleSignup} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Home;