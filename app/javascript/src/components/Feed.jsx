import React, { useState, useEffect } from 'react';
import { authenticate, logoutUser, getAllTweets, getUserTweets, postTweet, deleteOneTweet, searchTweets } from '../utils/api';
import FeedNavbar from './FeedNavbar';
import TweetForm from './TweetForm';
import ProfileCard from './ProfileCard';
import TweetFeed from './TweetFeed';
import Trends from './Trends';
import '../feeds.scss';

const Feed = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tweets, setTweets] = useState([]);
  const [usertweets, setuserTweets] = useState([]);
  const [tweetCount, setTweetCount] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const [tweetText, setTweetText] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    authenticate((res) => {
      if (res.authenticated) {
        setCurrentUser(res.username);
        setSelectedUser(res.username);
        fetchAllTweets();
        fetchUserTweets(res.username);
      }
    });
  }, []);

  const fetchAllTweets = () => {
    getAllTweets((tweets) => {
      setTweets(tweets || []);
    });
  };

  const fetchUserTweets = (currentUser) => {
    getUserTweets(currentUser, usertweets => {
      setuserTweets(usertweets || []);
      setTweetCount(usertweets ? usertweets.length : 0);
    });
  };
  const handlePostTweet = () => {
    postTweet(tweetText, image, (result) => {
      if (result.success) {
        setTweetText('');
        setImage(null);
        fetchAllTweets();
        fetchUserTweets(res.username);
      }
    });
  };

  const handleUserClick = (currentUser) => {
    getUserTweets(currentUser, usertweets => {
      setTweets(usertweets || []);
      setTweetCount(usertweets ? usertweets.length : 0);
    });
  };

  const handleTwitterClick = (currentUser) => {
        fetchAllTweets();
        fetchUserTweets(currentUser);
  };

  const handleDelete = (tweetId) => {
    deleteOneTweet(tweetId, fetchAllTweets);
  };

  const handleLogout = () => {
    logoutUser(() => {
      authenticate((res) => {
        if (!res.authenticated) {
          window.location.replace('/');
        }
      });
    });
  };

  const handleSearch = () => {
    if (searchKeyword.trim()) {
      searchTweets(searchKeyword, (results) => {
        setTweets(results || []);
      });
    }
  };
  
  return (
    <div className="homepage" style={{ height: '100vh', position: 'relative' }}>
      <FeedNavbar
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        onClick={handleTwitterClick}
      />
      <div id="feedContainer">
        <div className="container pt-3">
          <div className="row justify-content-center">
            <div className="col-sm-10">
              <div className="row">
                <div className="col-sm-4">
                  {currentUser && (
                    <>
                      <ProfileCard
                        username={currentUser}
                        tweetCount={usertweets.length}
                        onClick={handleUserClick}
                      />
                    </>
                  )}
                  <Trends />
                </div>
                <div className="col-sm-8 feed-box">
                  <div className="p-2 post-tweet-box">
                      <TweetForm
                        tweetText={tweetText}
                        setTweetText={setTweetText}
                        image={image}
                        setImage={setImage}
                        charCount={charCount}
                        setCharCount={setCharCount}
                        onSubmit={handlePostTweet}
                        onTweetPosted={fetchAllTweets}
                      />
                      <TweetFeed 
                        currentUser={currentUser}
                        tweets={tweets}
                        onClick={handleDelete}
                        onUserClick={handleUserClick}
                      />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
  );
};

export default Feed;
