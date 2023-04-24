import { useState, useEffect } from 'react';

const API_URL = 'https://valaakam.com/wp-json';

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
      fetchUserDetails(token);
    }
  }, []);

  const handleCreatePost = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/wp/v2/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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

  const fetchUserDetails = async (token) => {
    try {
      const response = await fetch(`${API_URL}/wp/v2/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUsername(data.name);
      setEmail(data.email);
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching user details.');
    }
  };

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
        return;
      }
      localStorage.setItem('token', data.token);
      setIsLoggedIn(true);
      setError(null);
      fetchUserDetails(data.token);
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
