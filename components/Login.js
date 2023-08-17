import React, { useState, useEffect } from 'react';

const API_URL = 'https://pirabu.com/wp-json';
const CUSTOM_POST_TYPE = 'blog'; // Change this to match your custom post type slug

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [createPostError, setCreatePostError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const storedUsername = localStorage.getItem('username');
      setLoggedInUsername(storedUsername);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_URL}/jwt-auth/v1/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        setIsLoggedIn(false);
        return;
      }
      setError(null);
      setIsLoggedIn(true);
      setLoggedInUsername(username);
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', username);
    } catch (error) {
      console.error(error);
      setError('An error occurred while logging in. Please try again later.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setError(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const uploadFeaturedImage = async (postId, token) => {
    try {
      const formData = new FormData();
      formData.append('file', selectedImage);
      formData.append('post', postId);

      const response = await fetch(`${API_URL}/wp/v2/media`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        setImageUploadError(data.message);
        return;
      }

      // Set the uploaded image as the featured image for the post
      await fetch(`${API_URL}/wp/v2/${CUSTOM_POST_TYPE}/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          featured_media: data.id,
        }),
      });
    } catch (error) {
      console.error(error);
      setImageUploadError('An error occurred while uploading the image.');
    }
  };

  const handleCreatePost = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/wp/v2/${CUSTOM_POST_TYPE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newPostTitle,
          content: newPostContent,
          status: 'publish',
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setCreatePostError(data.message);
        return;
      }

      if (selectedImage) {
        await uploadFeaturedImage(data.id, token);
      }

      setNewPostTitle('');
      setNewPostContent('');
      setSelectedImage(null);
      setImageUploadError(null);
      setCreatePostError(null);
    } catch (error) {
      console.error(error);
      setCreatePostError('An error occurred while creating the post. Please try again later.');
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>Hello {loggedInUsername}, you are logged in!</p>
          <button onClick={handleLogout}>Log out</button>
          <form onSubmit={handleCreatePost}>
            <div>
              <label htmlFor="newPostTitle">New Post Title</label>
              <input
                type="text"
                id="newPostTitle"
                value={newPostTitle}
                onChange={(event) => setNewPostTitle(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="newPostContent">New Post Content</label>
              <textarea
                id="newPostContent"
                value={newPostContent}
                onChange={(event) => setNewPostContent(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="featuredImage">Featured Image</label>
              <input
                type="file"
                id="featuredImage"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <button type="submit">Create Post</button>
            {imageUploadError && <p>{imageUploadError}</p>}
            {createPostError && <p>{createPostError}</p>}
          </form>
        </div>
      ) : (
        <div>
          <p>Wrong access. Please log in to create posts.</p>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button type="submit">Log in</button>
            {error && <p>{error}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
