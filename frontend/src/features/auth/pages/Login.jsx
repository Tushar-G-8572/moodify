import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import '../styles/form.scss';
import { useAuth } from '../hooks/useAuth';
import Loader from '../../shared/components/Loader';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { loading, handleLogin, notify } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      notify("Please enter email and password", "error");
      return;
    }

    try {
      await handleLogin(email, password);
      navigate('/');
    } catch (err) {
      notify("Email or password is incorrect", "error");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <main className="form-wrapper">
        <Loader />
      </main>
    )
  }

  return (
    <main className="form-wrapper">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} >
          <label htmlFor="email"></label>
          <input onInput={(e) => {
            setEmail(e.target.value)
          }}
            type="text" placeholder='email' id='email' />
          <label htmlFor="password"></label>
          <input onInput={(e) => { setPassword(e.target.value) }}
            type="text" id='password' placeholder='Password' />
          <button className='button' type='submit'>Login</button>
        </form>
        <p>Don't have an account? <Link to='/register'>Register</Link></p>
      </div>
    </main>
  )
}

export default Login