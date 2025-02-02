"use client";

import { useState } from 'react';
// Remove or review the contents of this file if it conflicts with your inline styles
import "./login.css"; 
import Link from 'next/link';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{ 
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await fetch('');
      // if (response.data.success) {
       
      // } else {
      //   setError(response.data.message);
      //   triggerShake();
      // }
    } catch (error) {
      console.error(error);
    }
  }
     

    // Custom validation
    if (!email || !password) {
      setError('Please fill in all fields');
      triggerShake();
      return;
    }

    // Clear previous errors before attempting login
    setError('');


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
