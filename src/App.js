import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const apiUrl = 'https://dummyjson.com/users';

      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          setUsers(data.users);
        } else {
          console.error('Error fetching user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);

  const getIpAddress = async () => {
    try {
      const response = await fetch('https://api.ipapi.com/api/check?access_key=93c378075972e087d6f084670dcccde8');
      if (response.ok) {
        const data = await response.json();
        const ipAddress = data.ip || 'Unknown';
        console.log('Fetched IP address:', ipAddress);
        return ipAddress;
      } else {
        console.error('Error fetching IP address:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching IP address:', error.message);
    }
    return 'Unknown';
  };

  const logUserActivity = async (userInput, userIp) => {
    try {
      const response = await fetch('http://localhost:3001/logUserActivity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput, userIp }),
      });

      if (response.ok) {
        console.log('User activity logged successfully');
      } else {
        console.error('Error logging user activity');
      }
    } catch (error) {
      console.error('Error logging user activity:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userIp = await getIpAddress();
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      setLoggedInUser(user);
      logUserActivity(email, userIp);
      alert('User logged in!');
    } else {
      setLoggedInUser(null);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
   
      <div className="App">
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" style={{ backgroundColor: 'blue', color: 'white' }}>
              Login
            </button>
          </form>

          <p>
            Don't have an account? <Link to="/registration">Register</Link>

          </p>
        </div>

        {loggedInUser && (
  <div style={{ marginTop: '20px' }}>
    <h3>User Information:</h3>
    <p>Name: {loggedInUser.firstName} {loggedInUser.lastName}</p>
    <p>Age: {loggedInUser.age}</p>
    <p>Email: {loggedInUser.email}</p>
  </div>
)}

      </div>
   
  );
};

export default App;
