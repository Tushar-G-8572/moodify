import React, { useState } from 'react'
import { useLocation,useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import '../styles/form.scss';
import Loader from '../../shared/components/Loader';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const email = location.state?.email;
  console.log(email);
  const navigate = useNavigate();
  const {loading,handleVerify,notify} = useAuth();

  const handleSubmit = async (e)=>{
    try{

      e.preventDefault();
      await handleVerify(email,otp);
      notify("Registration successful welcome to mooodify");
      navigate('/');
      
    }catch(err){
      console.log(err);
      notify("Invalid OTP, please retry again",'error');
      navigate('/register');
    }

  }

  if(loading){
    return (
        <main className="form-wrapper">
                <Loader />
        </main>
    )
  }

  return (
    <main className='form-wrapper'>
      <div className="form-container">
        <h1>Verify OTP</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email"></label>
          <input type="text" value={email} readOnly id='email' />
          <label htmlFor="otp"></label>
          <input type="text" id='otp' placeholder="Enter OTP" onInput={(e)=>{setOtp(e.target.value)}} value={otp} />
          <button type='submit' className='button' >Verify</button>
        </form>
      </div>
    </main>
  )
}

export default VerifyOTP