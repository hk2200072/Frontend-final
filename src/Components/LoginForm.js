import React, { useState } from 'react';

const LoginForm = ({ navigate }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const loginUser = () => {
    fetch('http://localhost:555/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      credentials: 'include'
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Login failed');
        }
        return res.json();
      })
      .then((data) => {
        alert('Login successful!');
        navigate('events');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="form-section">
      <h3>User Login</h3>
      <form>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="button" onClick={loginUser}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
