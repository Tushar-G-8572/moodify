import { useContext } from "react";
import { AuthContext } from "../auth.context";
import {login,logout,register,getMe,verify} from '../services/auth.api';

export async function useAuth() {
    const context = useContext(AuthContext);
    const {loading,setLoading,user,setUser} = context;

    const handleLogin = async(email,password)=>{
        setLoading(true);
        const responce = await login(email,password)
        setUser(responce.user);
        setLoading(false);
    }

    const hanldeRegister = async(username,email,password)=>{
        setLoading(true);
        const responce = await register(username,email,password);
        setUser(responce.user);
        setLoading(false);
    }

    const handleVerify = async(email,otp)=>{
        setLoading(true);
        const responce = await verify(email,otp);
        setUser(responce.user);
        setLoading(false);
    }

    const handleLogout = async()=>{
        setLoading(true);
        const responce = await logout();
        setUser(responce.user);
        setLoading(false);
    }

    const handleGetMe = async()=>{
        setLoading(true);
        const responce = await getMe();
        setUser(responce.user);
        setLoading(false);
    }

    return {
        loading,user,handleLogin,handleGetMe,handleLogout,hanldeRegister,handleVerify
    }

}