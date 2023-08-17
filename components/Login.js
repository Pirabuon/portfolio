import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false); // New state to track login failure

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://pirabu.com/?rest_route=/simple-jwt-login/v1/autologin&JWT=JWT',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          Cookies.set('token', data.token);
          setLoggedIn(true);
          setLoginFailed(false); // Reset login failure status
        } else {
          setLoginFailed(true); // Set login failure status
        }
      } else {
        setLoginFailed(true); // Set login failure status
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      {loggedIn ? (
        <p>Hello, {username}!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {loginFailed && <p>Login failed. Please try again.</p>} {/* Show failed message */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
}
