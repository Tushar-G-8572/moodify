import axios from "axios";

const api = axios.create({
    baseURL:"https://moodify-r1v4.onrender.com/api",
    // baseURL:"http://localhost:4000/api",
    withCredentials:true
})

export async function getPlaylist({mood}) {
    // console.log(mood);
    const responce = await api.get("/song",
         { params: { mood } }
     )
    return responce.data; 
}