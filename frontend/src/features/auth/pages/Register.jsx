import React, { useState } from 'react'
import '../styles/form.scss';
import { Link } from 'react-router';

const Register = () => {
    const [username,setUsername] =  useState();
    const [email,setEmail] =  useState();
    const [password,setPassword] =  useState();

    const handleSubmit = async (e)=>{
        e.preventDefault();
    }

  return (
    <main className="form-wrapper">
        <div className="form-container">
            <h1>Login Form</h1>
            <form onSubmit={handleSubmit} >
                <label htmlFor="username"></label>
                <input onInput={(e)=>{
                    setUsername(e.target.value)
                }}
                  type="text" placeholder='username' id='username' />
                <label htmlFor="email"></label>
                <input onInput={(e)=>{
                    setEmail(e.target.value)
                }}
                  type="text" placeholder='email' id='email' />
                <label htmlFor="password"></label>
                <input onInput={(e)=>{setPassword(e.target.value)}}
                type="text" id='password' placeholder='Password' />
                <button className='button' type='submit'>Register</button>
            </form>
            
            <p>Already have an account? <Link to='/login'>Login</Link></p>

        </div>
    </main>
  )
}

export default Register