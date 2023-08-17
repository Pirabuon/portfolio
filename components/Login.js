import React, { useState, useEffect } from 'react';

const API_URL = 'https://pirabu.com/wp-json';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
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

  const handleCreatePost = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/wp/v2/blog`, {
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
      setNewPostTitle('');
      setNewPostContent('');
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
            <button type="submit">Create Post</button>
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
