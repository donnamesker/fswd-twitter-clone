import React from 'react';

const ProfileCard = ({ username, tweetCount = 0, onClick }) => {
  
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">
          <a 
            className="username text-body text-decoration-none"
            href="#"
            title="Show only your tweets"
            onClick={(e) => {
              e.preventDefault();
              onClick(username);
            }}
          >
            {username}
          </a>
        </h5>
        <p className="card-subtitle mb-3 text-muted">
          <small>
            <a
              className="screenName text-muted text-decoration-none"
              href="#"
              title="Show only your tweets"
              onClick={(e) => {
                e.preventDefault();
                onClick(username);
              }}
            >
              @{username}
            </a>
          </small>
        </p>
        <div className="d-flex justify-content-around text-center">
          <div>
            <strong>{tweetCount}</strong>
            <div className="small text-muted">Tweets</div>
          </div>
          <div>
            <strong>0</strong>
            <div className="small text-muted">Following</div>
          </div>
          <div>
            <strong>0</strong>
            <div className="small text-muted">Followers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;