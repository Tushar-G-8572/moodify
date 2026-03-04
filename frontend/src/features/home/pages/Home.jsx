import React, { useState } from "react";
import Navbar from "../../shared/components/Navbar";
import FaceExpression from "../../Expression/components/FaceExpression";
import { useSong } from "../hooks/useSongs";
import Playlist from "../components/Playlist";
import Player from "../components/Player";

const Home = () => {

  const { handleGetPlaylists, playlist } = useSong();
  const [currentSong, setCurrentSong] = useState(null)

  const hasSongs = playlist && playlist.length > 0;

  return (
    <>
      <Navbar />

      <div className={`main ${hasSongs ? "show-playlist" : ""}`}>

        <FaceExpression
          onClick={(expression) => {
            handleGetPlaylists({ mood: expression });
          }}
        />

        {/* Conditional Rendering */}
        {hasSongs && <Playlist setCurrentSong={setCurrentSong} />}

      </div>
      <Player song={currentSong} />
    </>
  );
};

export default Home;