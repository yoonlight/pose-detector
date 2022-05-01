// eslint-disable-next-line no-unused-vars
import { LandmarkConnectionArray } from "@mediapipe/pose";

/**
 * Custom Pose Connection
 * @type {LandmarkConnectionArray}
 */
export const DEFAULT_POSE_CONNECTIONS = [
	[1, 2],
	[1, 3],
	[3, 5],
	[2, 4],
	[4, 6],
	[1, 7],
	[2, 8],
	[7, 8],
	[7, 9],
	[8, 10],
	[9, 11],
	[10, 12],
	[11, 13],
	[13, 15],
	[12, 14],
	[14, 16],
	[11, 15],
	[12, 16],
];

/**
 * Custom Crunch Pose Connection
 * @type {LandmarkConnectionArray}
 */
export const POSE_CONNECTIONS_CRUNCH = [
	[0, 2],
	[1, 3],
	[2, 4],
	[3, 5],
	[4, 6],
	[5, 7],
];

/**
 * Custom Leg raise Pose Connection
 * @type {LandmarkConnectionArray}
 */
export const POSE_CONNECTIONS_LEG_RAISE = [
	[0, 2],
	[2, 3],
	[1, 3],
	[2, 4],
	[4, 6],
	[6, 8],
	[3, 5],
	[5, 7],
];

/**
 * Custom Side lunge Pose Connection
 * @type {LandmarkConnectionArray}
 */
export const POSE_CONNECTIONS_SIDE_LUNGE = [
	[0, 1],
	[0, 2],
	[2, 4],
	[4, 6],
	[1, 3],
	[3, 5],
	[5, 7],
];

/**
 * Custom Keen up Pose Connection
 * @type {LandmarkConnectionArray}
 */
export const POSE_CONNECTIONS_KNEE_UP = [
	[0, 1],
	[0, 2],
	[2, 4],
	[4, 6],
	[1, 3],
	[3, 5],
];

/**
 * Custom Side crunch Pose Connection
 * @type {LandmarkConnectionArray}
 */
export const POSE_CONNECTIONS_SIDE_CRUNCH = [
	[0, 2],
	[0, 4],
	[1, 3],
	[1, 5],
	[4, 6],
	[6, 8],
	[5, 7],
	[7, 9],
];
