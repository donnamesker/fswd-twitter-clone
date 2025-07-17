import React from 'react';
import { logoutUser, authenticate } from '../utils/api';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

const HomeNav = ({ currentUser, setCurrentUser }) => {
  const history = useHistory();

  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container navbar-header">
          <a className="navbar-brand" href="#">
              <FontAwesomeIcon icon={faTwitter} />
          </a>
          <ul className="nav navbar-nav navbar-right">
              <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      language: <strong>English </strong><span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><a className="dropdown-item" href="#">Bahasa Malaya</a></li>
                      <li><a className="dropdown-item" href="#">Dansk</a></li>
                      <li><a className="dropdown-item" href="#">English</a></li>
                      <li><a className="dropdown-item" href="#">Suomi</a></li>
                  </ul>
              </li>
          </ul>
      </div>
    </nav>
  );
};

export default HomeNav;