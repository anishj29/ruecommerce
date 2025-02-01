"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import "./signup.css"; 
import Link from 'next/link';

const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Custom validation
    if (!email || !name || !password) {
      setError('Please fill in all fields');
      triggerShake();
      return;
    }

    // Clear previous errors before attempting login
    setError('');

    const res = await fetch('http://localhost:5000/login', {  // Ensure this URL matches your Flask backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, name, password })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      router.push('/');
    } else {
      setError(data.error);
      triggerShake();
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
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              // Remove the required attribute to let our validation run
              // required 
              className="user"
            />
          </div>
          <div>
            <input 
              type="text" 
              placeholder='Full Name'
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              // Remove the required attribute to let our validation run
              // required 
              className="name"
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
          <button className="bg-emerald-900 lg-button" type="submit">Create account</button>
        </form>

        <h1 className="create-account">Already have an account? <Link className="create-link" href="/login">Sign In</Link> </h1>
      </div>
    </>
  );
};

export default SignUpPage;
