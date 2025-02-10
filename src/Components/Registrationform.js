import React, { useState } from 'react';
const RegistrationForm = ({ navigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const registerUser = () => {
    fetch('http://localhost:555/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, isAdmin: false }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Registration failed');
        }
        alert('Registration successful! Please login.');
        navigate('login');
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
      <h3>User Registration</h3>
      <form>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />
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
        <button type="button" onClick={registerUser}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
