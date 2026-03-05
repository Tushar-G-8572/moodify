import React from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { useNavigate } from 'react-router';
import Loader from './Loader';
import '../navbar.scss'

const Navbar = () => {
    const {loading,handleLogout} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async()=>{
        try{
            await handleLogout();
            navigate('/login');
        }catch(err){
            console.log(err);
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
    <div className="nav-container">
    <nav className='navbar'>
        <h1 className='mood'>Mooodify</h1>
        <button onClick={handleSubmit} className='button'>Logout</button>
    </nav>
    </div>
  )
}

export default Navbar