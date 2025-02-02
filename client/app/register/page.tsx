"use client";
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import "./signup.css"; 
import Link from 'next/link';

const SignUpPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    location: { type: 'Point', coordinates: [0, 0] }, // Default location
  });
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Custom validation
    if (!formData.email || !formData.name || !formData.password) {
      setError('Please fill in all fields');
      triggerShake();
      return;
    }

    // Clear previous errors before attempting login
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      console.log(response.data.message);
      // Redirect to login page after successful registration
      router.push('/login');
    } catch (error) {
      triggerShake();
      console.log(error);
    }
  };

  return (
    <>
      <div className={`login-container ${shake ? 'shake' : ''}`}>
        <h1 className="title">RU ready to shop?</h1>
        <form noValidate onSubmit={handleSubmit}>
          <div>
            <input 
              type="text" 
              placeholder='Email'
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              // Remove the required attribute to let our validation run
              // required 
              className="user"
            />
          </div>
          <div>
            <input 
              type="text" 
              placeholder='Full Name'
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              // Remove the required attribute to let our validation run
              // required 
              className="name"
            />
          </div>
          <div>
            <input 
              type="password" 
              placeholder='Password'
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              // Remove the required attribute
              // required 
              className="pass"
            />
          </div>
          {error && <p className="error-text" >{error}</p>}
          <button className="bg-emerald-900 lg-button" type="submit">Create account</button>
        </form>

        <h1 className="create-account">Already have an account? <Link className="create-link" href="/login">Sign In</Link> </h1>
      </div>
    </>
  );
};

export default SignUpPage;
