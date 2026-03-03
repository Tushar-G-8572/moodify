import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, logout, register, getMe, verify } from '../services/auth.api';

export function useAuth() {
    const context = useContext(AuthContext);
    const { loading, setLoading, user, setUser } = context;

    useEffect(() => {
        if (!user) {
            handleGetMe();
        }
    }, []);

    const handleLogin = async (email, password) => {
        setLoading(true);
        const responce = await login(email, password)
        setUser(responce.user);
        setLoading(false);
    }

    const handleRegister = async (username, email, password) => {
        setLoading(true);
        const responce = await register(username, email, password);
        setUser(responce.user);
        setLoading(false);
    }

    const handleVerify = async (email, otp) => {
        setLoading(true);
        const responce = await verify(email, otp);
        setUser(responce.user);
        setLoading(false);
    }

    const handleLogout = async () => {
        try {
            await logout();
        } finally {
            setUser(null);
        }
    };

    const handleGetMe = async () => {
        try {
            setLoading(true);
            const response = await getMe();
            setUser(response.user);
        } catch (error) {
            // 🔥 Important
            setUser(null);
        } finally {
            setLoading(false);
        }
    };


    return {
        loading, user, handleLogin, handleGetMe, handleLogout, handleRegister, handleVerify
    }

}