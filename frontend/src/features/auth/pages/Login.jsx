import React from 'react'
import { useState } from 'react'
import {Link} from 'react-router'
import '../styles/form.scss';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [email,setEmail] =  useState();
  const [password,setPassword] =  useState();
  const {loading,handleLogin,user} = useAuth();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    await handleLogin(email,password);
  }

  if(loading){
    return (
        <main className="form-wrapper">
                <h1>Loading...</h1>
        </main>
    )
  }

  return (
    <main className="form-wrapper">
        <div className="form-container">
            <h1>Login Form</h1>
            <form onSubmit={handleSubmit} >
                <label htmlFor="email"></label>
                <input onInput={(e)=>{
                    setEmail(e.target.value)
                }}
                  type="text" placeholder='email' id='email' />
                <label htmlFor="password"></label>
                <input onInput={(e)=>{setPassword(e.target.value)}}
                type="text" id='password' placeholder='Password' />
                <button className='button' type='submit'>Login</button>
            </form>
            <p>Don't have an account? <Link to='/register'>Register</Link></p>
        </div>
    </main>
  )
}

export default Login