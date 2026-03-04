import {createBrowserRouter} from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import VerifyOTP from './features/auth/pages/VerifyOTP'
import Home from './features/home/pages/Home'
import Protected from './features/auth/components/Protected'

export const router = createBrowserRouter([
    {
        path:"/",
        element:<Protected>
                    <Home />
                </Protected>
    },
    {
        path:"/login",
        element:<Login />
    },
    {
        path:"/verify",
        element:<VerifyOTP />
    },
    {
        path:'/register',
        element:<Register />
    },
    
])