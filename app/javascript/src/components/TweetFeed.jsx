import React from 'react';

const TweetFeed = ({ currentUser, tweets, onClick, onUserClick }) => {

  return (
    <div className="feed">
      {tweets.length === 0 && <div className="tweet col-xs-12 my-1">No tweets to show.</div>}
      {tweets.map((tweet) => (
        <div key={tweet.id} className="tweet col-xs-12 my-1">
          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onUserClick(tweet.username);
            }}
          >
            {tweet.username}
          </a> 
          <a className="tweet-screenName" href="#">@{tweet.username}</a>
          {tweet.username === currentUser && (
            <small>
              <small>
                <a
                  className="delete-tweet"
                  id={tweet.id}
                  href="#"
                  onClick={() => onClick(tweet.id)}
                >
                  Delete
                </a>
              </small>
            </small>
          )}
          {tweet.image_url && (
            <img
              src={tweet.image_url}
              alt="Tweet media"
              className="img img-responsive"
              style={{ maxWidth: '100%', marginTop: '10px' }}
            />
          )}
          <p>{tweet.message}</p>
        </div>
      ))}
    </div>
  );
};

export default TweetFeed;