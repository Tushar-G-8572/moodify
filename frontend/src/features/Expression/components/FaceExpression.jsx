import React, { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

const FaceExpression = () => {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const animationFrameRef = useRef(null);

  const [expression, setExpression] = useState("Loading model...");
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  const setupCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      });

      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    };

  const init = async () => {
      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
      );

      faceLandmarkerRef.current =
        await FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          },
          outputFaceBlendshapes: true,
          runningMode: "VIDEO",
          numFaces: 1,
        });

      setIsModelLoaded(true);
      setExpression("Detecting...");
      detect();
    };


  const detect = () => {
      if (
        !videoRef.current ||
        !faceLandmarkerRef.current ||
        videoRef.current.readyState < 2
      ) {
        animationFrameRef.current = requestAnimationFrame(detect);
        return;
      }

      const results =
        faceLandmarkerRef.current.detectForVideo(
          videoRef.current,
          performance.now()
        );

      if (results.faceBlendshapes?.length > 0) {
        const blendshapes = results.faceBlendshapes[0].categories;

        const getScore = (name) =>
          blendshapes.find((b) => b.categoryName === name)?.score || 0;

        const smileLeft = getScore("mouthSmileLeft");
        const smileRight = getScore("mouthSmileRight");
        const frownLeft = getScore("mouthFrownLeft");
        const frownRight = getScore("mouthFrownRight");
        const browInnerUp = getScore("browInnerUp");
        const jawOpen = getScore("jawOpen");
        const eyeWideLeft = getScore("eyeWideLeft");
        const eyeWideRight = getScore("eyeWideRight");

        console.log(getScore("mouthFrownLeft"), getScore("mouthFrownRight"),getScore("browInnerUp") )
        // 😊 Happy
        if (smileLeft > 0.5 && smileRight > 0.5) {
          setExpression("😊 Happy");
        }

        // 😢 Sad
        else if (
          frownLeft >= 0.1 &&
          frownRight >= 0.1 &&
          browInnerUp >= 0.01
        ) {
          setExpression("😢 Sad");
        }

        // 😲 Surprised
        else if (
          jawOpen > 0.5 &&
          eyeWideLeft > 0.02 &&
          eyeWideRight > 0.02
        ) {
          setExpression("😲 Surprised");
        }

        // 😐 Neutral
        else {
          setExpression("😐 Neutral");
        }
      }

    //   animationFrameRef.current = requestAnimationFrame(detect);
    };

  useEffect(() => {
    setupCamera();
    init();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
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
      <button onClick={detect}>Detect Expression</button>
    </div>
  );
};

export default FaceExpression;