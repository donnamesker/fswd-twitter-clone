import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-body fixed-top">
        <div className="container">
            <a className="navbar-brand" href="#">
                <i className="fab fa-twitter"></i>
            </a>
            <ul className="navbar-nav navbar-right">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        language: <strong>English </strong><span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
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

export default Navbar;
