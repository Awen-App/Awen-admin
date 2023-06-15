"use client"
import { useState } from 'react';
import styles from './Login.module.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../fireBaseConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tokenResponse, setTokenResponse] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        setTokenResponse(user);
        console.log(tokenResponse);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(tokenResponse);

  return (
    <div className={styles.Container} >
      <h1>Welcome to AWEN Dashboard</h1>
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.formGroup}>
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
        <div className={styles.formGroup}>
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
        <button type="submit" className={styles.loginButton}>
          Login
        </button>
      </form>
    </div>
    </div>
  );
};

export default Login;

