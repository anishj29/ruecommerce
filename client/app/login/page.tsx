"use client";


import axios from 'axios';
import { useState } from 'react';
import "./login.css";
import { useRouter } from 'next/navigation';
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


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    // Custom validation
    if (!email || !password) {
      setError('Please fill in all fields');
      triggerShake();
      return;
    }


    // Clear previous errors before attempting login
    setError('');


    try {
      const response = await axios.post('https://localhost:5000/login', { email, password });
      if (response.status === 200) {
        console.log('Login successful');
        router.push('/profile');
      } else {
        setError('Invalid credentials');
        triggerShake();
      }
    } catch (err) {
      console.error(err);
      setError('Invalid credentials');
      triggerShake();
    }
  };


  return (
    <div className={`login-container ${shake ? 'shake' : ''}`}>
      <h1 className="title">Log in to your account</h1>
      <form noValidate onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="user"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pass"
          />
        </div>
        {error && <p className="error-text">{error}</p>}
        <button className="bg-emerald-900 lg-button" type="submit">
          Log In
        </button>
      </form>
      <h1 className="create-account">
        New to RU Shop?{" "}
        <Link className="create-link" href="/register">
          Create account
        </Link>
      </h1>
    </div>
  );
};


export default LoginPage;
