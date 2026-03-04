import React, { useRef, useState, useEffect } from "react";
import "../styles/player.scss";

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2];

const formatTime = (seconds) => {
  if (isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const Player = ({ song }) => {

  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [showSpeed, setShowSpeed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // 🔥 When new song selected
  useEffect(() => {
    if (!song || !audioRef.current) return;

    const audio = audioRef.current;

    audio.load();
    audio.play();
    setIsPlaying(true);
    setCurrentTime(0);

  }, [song]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  const skip = (secs) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Math.min(
      Math.max(audio.currentTime + secs, 0),
      duration
    );
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleProgressClick = (e) => {
    const bar = progressRef.current;
    const rect = bar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;

    const newTime = ratio * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSpeedChange = (s) => {
    const audio = audioRef.current;
    if (!audio) return;

    setSpeed(s);
    audio.playbackRate = s;
    setShowSpeed(false);
  };

  const handleVolume = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const val = parseFloat(e.target.value);

    setVolume(val);
    audio.volume = val;
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const handleSongEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  if (!song) return null;

  return (
    <div className="player">

      <audio
        ref={audioRef}
        src={song.song_url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleSongEnd}
      />

      {/* Song Info */}
      <div className="player__info">
        <img
          className="player__poster"
          src={song.poster}
          alt={song.title}
        />

        <div className="player__meta">
          <p className="player__title">{song.title}</p>
          <span className="player__mood">{song.mood}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="player__progress-wrap">

        <span className="player__time">
          {formatTime(currentTime)}
        </span>

        <div
          className="player__progress"
          ref={progressRef}
          onClick={handleProgressClick}
        >
          <div
            className="player__progress-fill"
            style={{ width: `${progress}%` }}
          />

          <div
            className="player__progress-thumb"
            style={{ left: `${progress}%` }}
          />
        </div>

        <span className="player__time">
          {formatTime(duration)}
        </span>

      </div>

      {/* Controls */}
      <div className="player__controls">

        {/* Speed */}
        <div className="player__speed-wrap">
          <button
            className="player__btn player__btn--speed"
            onClick={() => setShowSpeed(!showSpeed)}
          >
            {speed}×
          </button>

          {showSpeed && (
            <div className="player__speed-menu">
              {SPEED_OPTIONS.map((s) => (
                <button
                  key={s}
                  className={`player__speed-option ${
                    s === speed ? "active" : ""
                  }`}
                  onClick={() => handleSpeedChange(s)}
                >
                  {s}×
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Back */}
        <button
          className="player__btn player__btn--skip"
          onClick={() => skip(-5)}
        >
          5s
        </button>

        {/* Play */}
        <button
          className="player__btn player__btn--play"
          onClick={togglePlay}
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>

        {/* Forward */}
        <button
          className="player__btn player__btn--skip"
          onClick={() => skip(5)}
        >
          5s
        </button>

        {/* Volume */}
        <div className="player__volume">

          <button
            className="player__btn player__btn--vol"
            onClick={toggleMute}
          >
            🔊
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolume}
            className="player__volume-slider"
          />

        </div>

      </div>

    </div>
  );
};

export default Player;