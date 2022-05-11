import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { Camera } from "@mediapipe/camera_utils";
// eslint-disable-next-line no-unused-vars
import { Pose, VERSION, Results } from "@mediapipe/pose";
import { drawLandmarks, drawConnectors } from "@mediapipe/drawing_utils";
import { getDefaultLandmarks } from "./custom/customLandmark";
import { DEFAULT_POSE_CONNECTIONS } from "./custom/customPoseConnection";
import { getInputArr } from "./service/input";
import { detect } from "./service/tf";

function useWindowSize() {
	const [size, setSize] = useState([0, 0]);
	useLayoutEffect(() => {
		function updateSize() {
			setSize([window.innerWidth, window.innerHeight]);
		}
		window.addEventListener("resize", updateSize);
		updateSize();
		return () => window.removeEventListener("resize", updateSize);
	}, []);
	return size;
}

/**
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Results} results
 */
const draw = async (ctx, results) => {
	if (!results) return;
	const { poseLandmarks } = results;
	let landmark = getDefaultLandmarks(poseLandmarks);
	const arr = getInputArr(landmark);

	const cWidth = ctx.canvas.width;
	const cHeight = ctx.canvas.height;
	ctx.save();
	ctx.clearRect(0, 0, cWidth, cHeight);
	ctx.drawImage(results.segmentationMask, 0, 0, cWidth, cHeight);

	ctx.drawImage(results.image, 0, 0, cWidth, cHeight);

	ctx.globalCompositeOperation = "source-over";
	drawConnectors(ctx, landmark, DEFAULT_POSE_CONNECTIONS, {
		color: "#00FF00",
		lineWidth: 4,
	});
	drawLandmarks(ctx, landmark, {
		color: "#FF0000",
		lineWidth: 2,
	});
	ctx.restore();
	const result = await detect(arr);
	console.log(result);
};

const Canvas = (props) => {
	const { results } = props;
	const canvasRef = useRef(null);
	const [width, height] = useWindowSize();
	useEffect(() => {
		/** @type {HTMLCanvasElement} */
		const canvas = canvasRef.current;
		canvas.width = width;
		canvas.height = height;
		const ctx = canvas.getContext("2d");
		draw(ctx, results);
	});

	return <canvas ref={canvasRef} {...props} width={1280} height={720} />;
};

function Mediapipe() {
	const [results, setResults] = useState(null);
	const inputVideo = useRef();

	useEffect(() => {
		const pose = new Pose({
			locateFile: (file) => {
				return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@${VERSION}/${file}`;
				//   return `/pose/${file}`;
			},
		});
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
			if (!results.poseLandmarks) return;
			setResults(results);
		}
		const videoEl = inputVideo.current;
		const camera = new Camera(videoEl, {
			onFrame: async () => {
				await pose.send({ image: videoEl });
			},
		});
		camera.start();
	}, []);
	return (
		<div>
			<video
				ref={inputVideo}
				playsInline
				style={{ display: "none" }}
			></video>
			<Canvas results={results}></Canvas>
		</div>
	);
}

export default Mediapipe;
