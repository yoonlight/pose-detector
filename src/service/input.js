// eslint-disable-next-line no-unused-vars
import { NormalizedLandmarkList } from "@mediapipe/pose";

/**
 * Get Custom Landmark
 * @param {NormalizedLandmarkList} poseLandmarks
 * @returns {number[][]}
 */
export const getInputArr = (poseLandmarks) => {
	return poseLandmarks.map((landmark) => {
		delete landmark["visibility"];
		const { x, y, z } = landmark;
		return [x, y, z];
	});
};
