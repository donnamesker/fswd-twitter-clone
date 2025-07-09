import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { authenticate } from '../utils/api';

import Navbar from './Navbar';
import FeedNavbar from './FeedNavbar';
import Homepage from './Homepage';
import Feed from './Feed';
import TweetForm from './TweetForm';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authenticate(
      res => {
        setCurrentUser(res.username);
        setLoading(false);
      },
      err => {
        setCurrentUser(null);
        setLoading(false);
      }
    );
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      
      <Switch>
        <Route exact path="/">
          {currentUser ? <Redirect to="/feed" /> : <Homepage setCurrentUser={setCurrentUser} />}
        </Route>

        <Route path="/feed">
          {currentUser ? (
            <>
              <Feed currentUser={currentUser} />
            </>
          ) : (
            <Redirect to="/" />
          )}
        </Route>

        <Route path="/user/:username">
          {currentUser ? <UserProfile /> : <Redirect to="/" />}
        </Route>

        {/* Optional: fallback route */}
        <Route>
          
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;