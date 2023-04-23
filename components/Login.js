import { useState, useEffect } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      try {
        const response = await fetch('https://valaakam.com/wp-json/wp/v2/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
        setError('An error occurred while fetching user data.');
      }
    };
    fetchUserData();
  }, [isLoggedIn]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://valaakam.com/wp-json/jwt-auth/v1/37b7d079e7b9f84d249db8c7ce2d01f6f33', {
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
    } catch (error) {
      console.error(error);
      setError('An error occurred while logging in. Please try again later.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserData(null);
  };

  return (
    <>
      {userData ? (
        <>
          <p>Welcome, {userData.name} ({userData.email}).</p>
          <p>You registered on {new Date(userData.registered_date).toLocaleDateString()}.</p>
          <p>You have {userData.post_count} posts.</p>
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
