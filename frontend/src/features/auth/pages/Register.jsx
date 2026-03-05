import React, { useState } from 'react'
import '../styles/form.scss';
import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router';
import Loader from '../../shared/components/Loader';

const Register = () => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    const { loading, handleRegister, notify } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!email.trim() || !password || !username) {
                notify("Please enter email, password and username", "error");
                return;
            }

            await handleRegister(username, email, password);
            notify("Otp sent to your email, please verify");
            navigate(`/verify`, {
                state: { email }
            });
        } catch (err) {
            console.log(err);
            notify("Registration failed, please retry again", 'error');
        }
    }

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
                <h1>Registration</h1>
                <form onSubmit={handleSubmit} >
                    <label htmlFor="username"></label>
                    <input onInput={(e) => {
                        setUsername(e.target.value)
                    }}
                        type="text" placeholder='username' id='username' />
                    <label htmlFor="email"></label>
                    <input onInput={(e) => {
                        setEmail(e.target.value)
                    }}
                        type="text" placeholder='email' id='email' />
                    <label htmlFor="password"></label>
                    <input onInput={(e) => { setPassword(e.target.value) }}
                        type="text" id='password' placeholder='Password' />
                    <button className='button' type='submit'>Register</button>
                </form>

                <p>Already have an account? <Link to='/login'>Login</Link></p>

            </div>
        </main>
    )
}

export default Register