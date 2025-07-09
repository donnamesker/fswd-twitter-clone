import React from 'react';

const Welcome = () => {
  return (
    <div className="welcomText">
      <div id="welcome-text">
          <h1><strong>Welcome to Twitter.</strong></h1>
          <p>Connect with your friends &#8212; and other fascinating people. Get in-the-moment updates on the things that interest you. And watch events unfold, in real time, from every angle.</p>
      </div>
      <p><a href="#" id="twit-info">Hack Pacific - Backendium Twitter Project</a></p>
      <p><a href="#" id="twit-account">Tweet and photo by @Hackpacific<br />3:20 PM - 15 December 2016</a></p>
    </div>
  );
};

export default Welcome;