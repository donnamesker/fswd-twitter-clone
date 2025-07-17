import React from 'react';
import { logoutUser, authenticate } from '../utils/api';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

const FeedNav = ({ currentUser, setCurrentUser, onClick }) => {
  const history = useHistory();

  const handleLogout = () => {
    logoutUser(() => {
      authenticate(
        res => {
          if (res.authenticated) {
            setCurrentUser(null);
            window.location.replace('/');
          } else {
            console.error('Invalid logout response:', res);
            alert('Logout failed');
          }
        }
      );
    });
  };

  return (
    
        <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container navbar-header text-center">
                <a
                  className="navbar-brand col-sm-2" 
                  href="#"
                  title="Show all tweets"
                  onClick={(e) => {
                    e.preventDefault();
                    onClick(currentUser);
                  }}
                >
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
                <form className="d-flex search-form">
                    <input className="form-control form-control-sm search-input" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-secondary" type="submit">Go!</button>
                </form>
                <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {currentUser}
                        </a>
                        <ul className="dropdown-menu border-0" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="#">User</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#">Lists</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#">Help</a></li>
                            <li><a className="dropdown-item" href="#">Keyboard shortcuts</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#">Settings</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a id="log-out" className="dropdown-item" href="#" onClick={handleLogout}>Log out</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
  );
};

export default FeedNav;
