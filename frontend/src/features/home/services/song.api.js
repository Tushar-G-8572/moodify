import axios from "axios";

const api = axios.create({
    baseURL:"https://moodify-lcnr.onrender.com/api",
    withCredentials:true
})

export async function getPlaylist({mood}) {
    console.log(mood);
    const responce = await api.get("/song",
         { params: { mood } }
     )
    return responce.data; 
}