import React from 'react';

const Tweet = ({ tweet, isOwner, onDelete }) => {
  return (
    <div className="tweet">
      <a className="tweet-username">{tweet.username}</a>
      <a className="tweet-screenName">@{tweet.username}</a>
      {tweet.image && <img src={tweet.image} alt="tweet" />}
      <p>{tweet.message}</p>
      {isOwner && (
        <a onClick={() => onDelete(tweet.id)} className="delete-tweet" href="#">Delete</a>
      )}
    </div>
  );
};

export default Tweet;