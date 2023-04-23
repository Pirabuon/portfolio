import { useState, useEffect } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('https://valaakam.com/wp-json/wp/v2/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          setUser(data);
          setIsLoggedIn(true);
        })
        .catch(error => {
          console.error(error);
          setIsLoggedIn(false);
        });
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://valaakam.com/wp-json/wp/v2/users?username=${username}&password=${password}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.length === 0) {
        setError('Invalid username or password.');
        return;
      }
      const tokenResponse = await fetch('https://valaakam.com/wp-json/jwt-auth/v1/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const tokenData = await tokenResponse.json();
      localStorage.setItem('token', tokenData.token);
      setIsLoggedIn(true);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('An error occurred while logging in. Please try again later.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <>
      {isLoggedIn && user ? (
        <>
          <p>Welcome, {user.name} ({user.email})!</p>
          <p>You have {user.post_count} posts.</p>
          <button onClick={handleLogout}>Log out</button>
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
    </>
  );
};

export default Login;
