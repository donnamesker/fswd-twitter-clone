import React, { useState } from 'react';
import { postTweet } from '../utils/api';

const TweetForm = ({ currentUser, onTweetPosted }) => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [charCount, setCharCount] = useState(0);

  const handlePost = () => {
    postTweet(message, image, result => {
      if (result.success) {
        setMessage('');
        setImage(null);
        setCharCount(0);
        if (onTweetPosted) onTweetPosted(); // Refresh parent feed if callback passed
      }
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const clearImage = () => {
    setImage(null);
    document.getElementById('image-select').value = '';
  };

  return (
    <div className="tweet-form mt-0 mb-3">
      <textarea
        value={message}
        onChange={e => {
          setMessage(e.target.value);
          setCharCount(e.target.value.length);
        }}
        maxLength={140}
        className="form-control form-control-sm post-input mb-2"
        rows="3"
        placeholder="What's happening?"
      />
      <div className="text-end">
        <label htmlFor="image-select" className="btn btn-secondary btn-sm me-2">
          Upload Image
        </label>
        <input
          type="file"
          id="image-select"
          onChange={handleImageChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
        <span className="post-char-counter me-2">{140 - charCount}</span>
        <button
          className="btn btn-primary btn-sm"
          onClick={handlePost}
          disabled={charCount === 0 || charCount > 140}
          id="post-tweet-btn"
        >
          Post
        </button>
      </div>

      {image && (
        <div className="mb-2">
          <img
            src={URL.createObjectURL(image)}
            onClick={clearImage}
            alt="Preview"
            className="img img-preview"
            style={{ maxHeight: '150px', cursor: 'pointer' }}
          />
        </div>
      )}
    </div>
  );
};

export default TweetForm;