import { useContext } from "react";
import { SongContext } from "../song.context";
import { getPlaylist } from "../services/song.api";

export  function useSong() {
    const context = useContext(SongContext);
    const {loading,setLoading,playlist,setPlaylist} = context;

    async function handleGetPlaylists({mood}) {
        // console.log("handleGetPlaylist",mood);
        setLoading(true);
        const responce = await getPlaylist({mood});
        setPlaylist(responce.playlist);
        setLoading(false);
    }

    return{
        loading,handleGetPlaylists,playlist
    }

}