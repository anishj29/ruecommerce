"use client";

import axios from 'axios';
import { useState } from 'react';
import "./login.css"; 
import { useRouter } from 'next/router';
import Link from 'next/link';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

    // Custom validation
    if (!email || !password) {
      setError('Please fill in all fields');
      triggerShake();
      return;
    }

    // Clear previous errors before attempting login
    setError('');
  
  const handleSubmit = async (e) => {
    const data = await axios.post('https://localhost:3000/login', { email, password });
    if(data.status === 200) {
      router.push('/profile');
      console.log('Login successful');
    }else { 
      setError('Invalid credentials');
      triggerShake();
    }
  };

  return (
    <>
      <div className={`login-container ${shake ? 'shake' : ''}`}>
        <h1 className="title">Log in to your account</h1>
        <form noValidate onSubmit={handleSubmit}>
          <div>
            <input 
              type="text" 
              placeholder='Email'
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              // Remove the required attribute to let our validation run
              // required 
              className="user"
            />
          </div>
          <div>
            <input 
              type="password" 
              placeholder='Password'
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              // Remove the required attribute
              // required 
              className="pass"
            />
          </div>
          {error && <p className="error-text" >{error}</p>}
          <button className="bg-emerald-900 lg-button" type="submit">Log In</button>
        </form>

        <h1 className="create-account">New to RU Shop? <Link className="create-link" href="/register">Create account</Link> </h1>
      </div>
    </>
  );
};

export default LoginPage;
