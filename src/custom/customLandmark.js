// eslint-disable-next-line no-unused-vars
import { NormalizedLandmarkList } from "@mediapipe/pose";

/**
 * Get Custom Landmark
 * @param {NormalizedLandmarkList} poseLandmarks
 * @returns {NormalizedLandmarkList}
 */
export const getDefaultLandmarks = (poseLandmarks) => {
	let landmarks1 = poseLandmarks.slice(11, 17);
	let landmarks2 = poseLandmarks.slice(23, 33);
	let landmarks = [poseLandmarks[0], ...landmarks1, ...landmarks2];
	return landmarks;
};

/**
 * Get Custom Crunch Landmark
 * Input poseLandmarks is value from getDefaultLandmarks function
 * @param {NormalizedLandmarkList} poseLandmarks
 * @returns {NormalizedLandmarkList}
 */
 export const getCrunchLandmarks = (poseLandmarks) => {
	let landmarks1 = poseLandmarks.slice(1, 3);
	let landmarks2 = poseLandmarks.slice(7, 13);
	let landmarks = [...landmarks1, ...landmarks2];
	return landmarks;
};

/**
 * Get Custom Side Lunge Landmark
 * Input poseLandmarks is value from getDefaultLandmarks function
 * @param {NormalizedLandmarkList} poseLandmarks
 * @returns {NormalizedLandmarkList}
 */
export const getSideLungeLandmarks = (poseLandmarks) => {
	let landmarks = poseLandmarks.slice(7, 13);
	return landmarks;
};

/**
 * Get Custom Leg Raise Landmark
 * Input poseLandmarks is value from getDefaultLandmarks function
 * @param {NormalizedLandmarkList} poseLandmarks
 * @returns {NormalizedLandmarkList}
 */
export const getLegRaiseLandmarks = (poseLandmarks) => {
	let landmarks1 = poseLandmarks.slice(1, 3);
	let landmarks2 = poseLandmarks.slice(7, 13);
	let landmarks = [...landmarks1, ...landmarks2];
	return landmarks;
};

/**
 * Get Custom Keen Up Landmark
 * Input poseLandmarks is value from getDefaultLandmarks function
 * @param {NormalizedLandmarkList} poseLandmarks
 * @returns {NormalizedLandmarkList}
 */
export const getKeenUpLandmarks = (poseLandmarks) => {
	let landmarks = poseLandmarks.slice(7, 13);
	return landmarks;
};

/**
 * Get Custom Side Crunch Landmark
 * Input poseLandmarks is value from getDefaultLandmarks function
 * @param {NormalizedLandmarkList} poseLandmarks
 * @returns {NormalizedLandmarkList}
 */
export const getSideCrunchLandmarks = (poseLandmarks) => {
	let landmarks1 = poseLandmarks.slice(1, 5);
	let landmarks2 = poseLandmarks.slice(7, 13);
	let landmarks = [...landmarks1, ...landmarks2];
	return landmarks;
};
