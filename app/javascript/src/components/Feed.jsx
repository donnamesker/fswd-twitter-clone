import React, { useState, useEffect } from 'react';
import { authenticate, logoutUser, getAllTweets, getUserTweets, postTweet, deleteOneTweet, searchTweets } from '../utils/api';
import FeedNav from './FeedNav';
import TweetForm from './TweetForm';
import ProfileCard from './ProfileCard';
import TweetFeed from './TweetFeed';
import '../feed.scss';

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
        fetchUserTweets(currentUser);
      }
    });
  };

  const handleUserClick = (currentUser) => {
    console.log(currentUser);
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
    <div className="homepage">
      <FeedNav
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
                  <div className="card trends">
                    <div className="trends-header ms-3">
                        <span>Trends</span>
                        <span> &#183; </span>
                        <small>
                            <a href="#" className="small text-decoration-none">Change</a>
                        </small>
                    </div>
                    <ul className="trends-list ms-3">
                        <li key="#Hongkong">
                            <a href="#" className="text-decoration-none">#Hongkong</a>
                        </li>
                        <li key="#Ruby">
                            <a href="#" className="text-decoration-none">#Ruby</a>
                        </li>
                        <li key="#foobarbaz">
                            <a href="#" className="text-decoration-none">#foobarbaz</a>
                        </li>
                        <li key="#rails">
                            <a href="#" className="text-decoration-none">#rails</a>
                        </li>
                        <li key="#API">
                            <a href="#" className="text-decoration-none">#API</a>
                        </li>
                    </ul>
                </div>
                </div>
                <div className="col-sm-8 feed-box">
                  <div className="p-2 post-tweet-box">
                      <TweetForm
                        currentUser={currentUser}
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