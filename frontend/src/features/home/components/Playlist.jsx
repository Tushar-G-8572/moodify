import { useSong } from "../hooks/useSongs";
import "../styles/playlist.scss";
import Loader from "../../shared/components/Loader";

function Playlist({ setCurrentSong }) {

  const { loading,playlist } = useSong();

  console.log(playlist);

  if(loading){
    return(
        <main className="form-wrapper">
                <Loader />
        </main>
    )
  }

  return (
    <div className="playlist-container">

      <h1 className="playlist-title">Your Playlist 🎵</h1>

      <div className="playlist-table">

        {/* Header */}
        <div className="playlist-header">
          <p>Poster</p>
          <p>Title</p>
          <p>Play</p>
        </div>

        {/* Songs */}
        {playlist?.length > 0 &&
          playlist?.map((song) => (
            <div key={song._id} className="playlist-row"
              onClick={() => setCurrentSong(song)}
            >

              <img
                src={song.poster}
                alt={song.title}
                className="song-poster"
              />

              <p className="song-title">{song.title}</p>



              <button
                className="play-btn"

              >
                ▶ Play
              </button>

            </div>
          ))}

      </div>

    </div>
  );
}

export default Playlist;