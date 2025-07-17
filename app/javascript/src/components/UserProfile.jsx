import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserTweets } from '../utils/api';

const UserProfile = () => {
  const { username } = useParams();
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserTweets(username, (userTweets) => {
      setTweets(userTweets);
      setLoading(false);
    });
  }, [username]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="user-profile container mt-4">
      <div className="user-info mb-4">
        <h2>{username}</h2>
        <p>@{username}</p>
        <p><strong>{tweets.length}</strong> Tweets</p>
      </div>

      <div className="tweets-list">
        {tweets.map(tweet => (
          <div key={tweet.id} className="card mb-3 p-3">
            <p className="mb-1">@{tweet.username}</p>
            {tweet.image && (
              <img src={tweet.image} alt="Tweet" className="img-fluid mb-2" />
            )}
            <p>{tweet.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;