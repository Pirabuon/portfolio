import React, { useState } from 'react';

const API_URL = 'https://pirabu.com/wp-json';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState('');

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
    } catch (error) {
      console.error(error);
      setError('An error occurred while logging in. Please try again later.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setError(null);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>Hello {loggedInUsername}, you are logged in!</p>
          <button onClick={handleLogout}>Log out</button>
        </div>
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
    </div>
  );
};

export default Login;
