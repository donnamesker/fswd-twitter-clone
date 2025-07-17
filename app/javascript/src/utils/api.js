import { safeCredentials, handleErrors } from './fetchHelper';

//------------------ Create User --------------------
export function createUser(username, email, password, successCB, errorCB) {
  fetch('/api/users', safeCredentials({
    method: 'POST',
    body: JSON.stringify({
      user: {
        username,
        email,
        password,
      },
    }),
  }))
  .then(handleErrors)
  .then(response => response.json())
  .then(data => successCB(data))
  .catch(error => {
    console.error('Sign in failed:', error);
    if (errorCB) errorCB(error);
  });
}
//------------------ Signing In -----------------------
export function signInUser(username, password, successCB, errorCB) {
  fetch('/api/sessions', safeCredentials({
    method: 'POST',
    body: JSON.stringify({
      user: {
        username,
        password,
      }
    }),
  }))
    .then(handleErrors)
    .then(response => response.json())
    .then(data => successCB(data))
    .catch(error => {
      console.error('Sign in failed:', error);
      if (errorCB) errorCB(error);
    });
}
//------------------- Logging Out ---------------------
export function logoutUser(callback) {
  fetch('api/sessions', safeCredentials({
    method: 'DELETE',
  }))
  .then(handleErrors)
  .then(() => callback())
  .catch(err => console.error('Logout failed:', err));
}
//------------------ Authenticate ---------------------
export function authenticate(successCB, errorCB) {
  fetch('/api/authenticated', safeCredentials({
    method: 'GET',
  }))
    .then(response => {
      if (response.status === 401) {
        successCB({ authenticated: false });
        return null;
      }
      return response.json();
    })
    .then(data => {
      if (data) {
        //console.log(data);
        if (data.authenticated) {
          successCB(data);
        } else {
          successCB({ authenticated: true });
        }
      }
    })
    .catch(err => {
      console.error('Authentication error:', err);
      if (typeof errorCB === 'function') {
        errorCB(err.message || 'Auth failed');
      }
    });
}
//---------------------- Tweets -----------------------
//------------------- Post a Tweet --------------------
import { safeCredentialsFormData } from './fetchHelper';

export function postTweet(message, image, callback) {
  const formData = new FormData();
  if (message) formData.append('tweet[message]', message);
  if (image) formData.append('tweet[image]', image, image.name);

  fetch('/api/tweets', safeCredentialsFormData({
    method: 'POST',
    body: formData,
  }))
  .then(handleErrors)
  .then(() => callback({ success: true }))
  .catch(err => {
    console.error('Post tweet failed:', err);
    callback({ success: false });
  });
}
//------------------- Get all Tweets ------------------
export function getAllTweets(callback) {
  fetch('/api/tweets', safeCredentials({
    method: 'GET',
  }))
    .then(handleErrors)
    .then(response => response.json())
    .then(data => {
        callback(data.tweets || []);
    })
    .catch(error => console.error('Fetch all tweets by username error:', error));
}
//----------------- Get tweet by ID --------------------
export function getOneTweet(id, callback) {
  fetch(`/api/tweets/${id}`, safeCredentials())
    .then(handleErrors)
    .then(response => callback(response))
    .catch(err => console.error('Fetch tweet failed:', err));
}
//------------- Get All Tweets by Username -------------
export function getUserTweets(username, callback) {
  fetch(`/api/users/${username}/tweets`, safeCredentials())
    .then(handleErrors)
    .then(response => response.json())
    .then(data => callback(data.tweets || []))
    .catch(err => console.error('Fetching user tweets failed:', err));
}
//---------------- Delete a tweet by ID ----------------
export function deleteOneTweet(id, callback) {
  fetch(`/api/tweets/${id}`, safeCredentials({
    method: 'DELETE',
  }))
  .then(handleErrors)
  .then(() => callback())
  .catch(err => console.error('Delete failed:', err));
}
//--------------- Search Tweet by Keyword --------------
export function searchTweets(keyword, callback) {
  fetch(`/api/tweets/search/${encodeURIComponent(keyword)}`, safeCredentials())
    .then(handleErrors)
    .then(response => callback(response.tweets))
    .catch(err => console.error('Search failed:', err));
}
