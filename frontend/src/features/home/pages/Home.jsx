import React, { useState } from "react";
import Navbar from "../../shared/components/Navbar";
import FaceExpression from "../../Expression/components/FaceExpression";
import { useSong } from "../hooks/useSongs";
import Playlist from "../components/Playlist";
import Player from "../components/Player";
import { useAuth } from "../../auth/hooks/useAuth";
import Loader from "../../shared/components/Loader";

const Home = () => {

  const { loading,handleGetPlaylists, playlist } = useSong();
  const [currentSong, setCurrentSong] = useState(null)

  const { user,notify } = useAuth();
  
  {loading && <Loader />}

  const hasSongs = playlist && playlist.length > 0;

  return (
    <>
      <Navbar />

      <div className={`main ${hasSongs ? "show-playlist" : ""}`}>

      {user && <FaceExpression
          onClick={(expression) => {
            handleGetPlaylists({ mood: expression });
          }}
        />}
        

        {/* Conditional Rendering */}
        {hasSongs && <Playlist setCurrentSong={setCurrentSong} />}

      </div>
      <Player song={currentSong} />
    </>
  );
};

export default Home;