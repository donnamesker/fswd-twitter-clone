import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from './components/OGNavbar';

import './home.scss';

const Home = () => {
  return (
    <>
      <Navbar />
      <div id="homeback">
        <div className="container main">
          <div className="row">
            <div className="front-card col-sm-10 offset-sm-1">
              <div className="row">
                <div className="col-sm-6 welcome">
                  <div id="welcome-text">
                    <h1><strong>Welcome to Twitter.</strong></h1>
                    <p>Connect with your friends &#8212; and other fascinating people. Get in-the-moment updates on the things that interest you. And watch events unfold, in real time, from every angle.</p>
                  </div>
                  <p><a href="#" id="twit-info">Hack Pacific - Backendium Twitter Project</a></p>
                  <p><a href="#" id="twit-account">Tweet and photo by @Hackpacific<br />3:20 PM - 15 December 2016</a></p>
                </div>
                <div className="col-sm-4 offset-sm-1">
                  <div className="card mb-2 log-in">
                    <div className="card-body">
                      <form>
                        <div className="row mb-2">
                          <div className="col-12">
                            <input type="text" className="form-control form-control-sm username" placeholder="Username" />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-8">
                            <input type="password" className="form-control form-control-sm password" placeholder="Password" />
                          </div>
                          <div className="col-4">
                            <button id="log-in-btn" className="btn btn-primary btn-sm offset-sm-1">Log in</button>
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
                  <div className="card sign-up">
                    <div className="card-body">
                      <form>
                        <div className="row mb-2">
                          <div className="col-12 new-to-t">
                            <strong>New to Twitter?</strong><span> Sign Up</span>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-12">
                            <input type="text" className="form-control form-control-sm username" placeholder="Username" />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-12">
                            <input type="email" className="form-control form-control-sm email" placeholder="Email" />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-12">
                            <input type="password" className="form-control form-control-sm password" placeholder="Password" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 text-end">
                            <button id="sign-up-btn" className="btn btn-warning btn-sm">Sign up for Twitter</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
