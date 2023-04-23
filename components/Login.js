is following code correct?

import { useState, useEffect } from 'react';

const Login = () => {
  const [title, setTitle] = useState('');
const [content, setContent] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleCreatePost = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://valaakam.com/wp-json/wp/v2/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          title: title,
          content: content,
          status: 'publish',
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        return;
      }
      setTitle('');
      setContent('');
    } catch (error) {
      console.error(error);
      setError('An error occurred while creating the post. Please try again later.');
    }
  };
  

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://valaakam.com/wp-json/jwt-auth/v1/token', {
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
        return;
      }
      localStorage.setItem('token', data.token);
      setIsLoggedIn(true);
      setError(null);
  
      // Fetch user's details and update the state
      const userResponse = await fetch('https://valaakam.com/wp-json/wp/v2/users/me', {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      const userData = await userResponse.json();
      setUsername(userData.name);
      setEmail(userData.email);
    } catch (error) {
      console.error(error);
      setError('An error occurred while logging in. Please try again later.');
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    
    <>
  {isLoggedIn ? (
    <>
      <p>Hello {username}, your email id is {email}!</p>
      <form onSubmit={handleCreatePost}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </>
  ) : (
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
  )}
  {isLoggedIn && (
    <button onClick={handleLogout}>Log out</button>
  )}
</>

  );
};

export default Login;
