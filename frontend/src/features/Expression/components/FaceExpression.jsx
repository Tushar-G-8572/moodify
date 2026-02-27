import React, { useEffect, useRef, useState } from "react";
import { init, detect } from "../utils/expression.util";

const FaceExpression = () => {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);

  const [expression, setExpression] = useState("Loading model...");
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  const setupCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480 },
    });

    videoRef.current.srcObject = stream;
    await videoRef.current.play();
  };

  useEffect(() => {
    setupCamera();
    init({ faceLandmarkerRef, setIsModelLoaded });

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) =>
          track.stop()
        );
      }
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>AI Face Expression Detector</h2>

      <video
        ref={videoRef}
        style={{
          width: "480px",
          borderRadius: "10px",
          border: "2px solid black",
        }}
        autoPlay
        muted
      />

      <h1 style={{ marginTop: "20px" }}>
        {isModelLoaded ? expression : "Loading..."}
      </h1>

      <button
        onClick={() =>
          detect({
            videoRef,
            faceLandmarkerRef,
            setExpression,
          })
        }
      >
        Detect Expression
      </button>
    </div>
  );
};

export default FaceExpression;