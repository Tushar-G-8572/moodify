import { createContext,useState } from "react";

export const SongContext = createContext();

export const SongProvider = ({children}) => {
    const [playlist,setPlaylist] = useState(null);
    const [loading,setLoading] = useState(true);
    return (
        <SongContext.Provider value={{playlist,setPlaylist,loading,setLoading}}>
            {children}
        </SongContext.Provider>
    )
}