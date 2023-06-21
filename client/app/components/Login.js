"use client"
import { useState } from 'react';
import styles from './Login.module.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../fireBaseConfig';
import Image from 'next/image';
import logo from '../../public/logo.png';
import { useRouter } from 'next/navigation';
const Login = () => {
  const route=useRouter()
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
        route.push('/home')
      })
      .catch((error) => {
        console.log(error);
      });

  };

  console.log(tokenResponse);

  return (
    <div className={styles.Container} >
      <div className={styles.logoContainer}>
        <Image className={styles.logo} src={logo} alt='...'/>
      </div>
      
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

