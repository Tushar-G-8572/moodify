import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:4000/api/auth',
    withCredentials:true
})

export const login = async (email,password)=>{
    const responce = await api.post('/login',{
        email,password
    })
    return responce.data;
} 

export const register = async(username,email,password)=>{
  const responce = await api.post('/register',{
        username,
        email,
        password
    })
    return responce.data;
}

export const verify = async(email,otp)=>{
    const responce = await api.post("/register/verify",{
        email,otp
    });
    return responce.data
}

export const getMe = async()=>{
    const responce = await api.get('/get-me');
    return responce.data
}

export const logout = async()=>{
    const responce = await api.get('/logout');
    return responce.data
}