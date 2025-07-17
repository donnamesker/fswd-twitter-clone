import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import App from './components/App'

import '../packs/application.scss';
import './home.scss';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div'))
  );
});
