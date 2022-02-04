import { useRef, useEffect } from "react";
import { Camera } from "@mediapipe/camera_utils";
import { Pose, POSE_CONNECTIONS, VERSION } from "@mediapipe/pose";
import { drawLandmarks, drawConnectors } from "@mediapipe/drawing_utils";

function Mediapipe() {
  const inputVideo = useRef();
  const outputCanvas = useRef();
  const pose = new Pose({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@${VERSION}/${file}`;
      //   return `/pose/${file}`;
    },
  });

  useEffect(() => {
    let canvasElement = outputCanvas.current;
    let canvasCtx = canvasElement.getContext("2d");
    canvasElement.height = window.innerHeight
    canvasElement.width = window.innerWidth
    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    pose.onResults(onResults);
    pose.initialize();

    function onResults(results) {
      if (!results.poseLandmarks) {
        return;
      }

      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.drawImage(
        results.segmentationMask,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      canvasCtx.globalCompositeOperation = "source-over";
      drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
        color: "#00FF00",
        lineWidth: 4,
      });
      drawLandmarks(canvasCtx, results.poseLandmarks, {
        color: "#FF0000",
        lineWidth: 2,
      });
      canvasCtx.restore();
    }
    const videoEl = inputVideo.current;
    const camera = new Camera(videoEl, {
      onFrame: async () => {
        await pose.send({ image: videoEl });
      },
    });
    camera.start();
  });
  return (
    <div>
      <video ref={inputVideo} playsInline style={{ display: "none" }}></video>
      <canvas ref={outputCanvas} width="1280px" height="720px"></canvas>
    </div>
  );
}

export default Mediapipe;
