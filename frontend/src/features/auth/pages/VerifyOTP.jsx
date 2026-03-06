import React, { useState } from 'react'
import { useLocation,useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import '../styles/form.scss';
import Loader from '../../shared/components/Loader';
import FormGroup from '../components/FormGroup';

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
      notify("Invalid OTP, please retry",'error');
      
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
 
          <FormGroup label="OTP" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />

          <button type='submit' className='button' >Verify</button>
          
        </form>
      </div>
    </main>
  )
}

export default VerifyOTP