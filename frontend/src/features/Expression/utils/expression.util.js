import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const init = async ({
  faceLandmarkerRef,
  setIsModelLoaded,
}) => {
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
};

export const detect = ({
  videoRef,
  faceLandmarkerRef,
  setExpression,
}) => {
  if (
    !videoRef.current ||
    !faceLandmarkerRef.current ||
    videoRef.current.readyState < 2
  ) {
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

    let currentExpression = null;

    if (smileLeft > 0.5 && smileRight > 0.5) {
      currentExpression="happy";
    } else if (
      frownLeft >= 0.1 &&
      frownRight >= 0.1 &&
      browInnerUp >= 0.01
    ) {
      currentExpression="sad";
    } else if (
      jawOpen > 0.5 &&
      eyeWideLeft > 0.02 &&
      eyeWideRight > 0.02
    ) {
      currentExpression="surprised";
    } else {
      currentExpression="neutral";
    }
    setExpression(currentExpression);
    return currentExpression
  }
};