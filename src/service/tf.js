import * as tf from "@tensorflow/tfjs";
import { har } from "./model";
import { scaler } from "./scikit";

/**
 * @param {number[][]} landmark
 */
const getJoint = (landmark) => tf.tensor(landmark);

/**
 * convert array to tensor applying index slicing
 * @param {number[][]} array
 * @param {number[]} vectorIdArr
 * @returns
 */
const cv2Vec = (array, vectorIdArr) => {
	const vArr = vectorIdArr.map((vId) => array[vId]);
	return tf.tensor(vArr);
};

/**
 * convert radian to degree
 * @param {tf.Tensor} radians
 * @returns
 */
const radian2degree = (radians) => {
	const pi = tf.scalar(180 / Math.PI);
	return tf.mul(radians, pi);
};

/**
 *
 * @param {number[][]} landmark
 */
const getPointAngle = async (landmark) => {
	const v1Id = [4, 2, 2, 8, 10, 12, 3, 1, 1, 7, 9, 11];
	const v2Id = [6, 4, 8, 10, 12, 16, 5, 3, 7, 9, 11, 15];
	const v1 = cv2Vec(landmark, v1Id);
	const v2 = cv2Vec(landmark, v2Id);

	let v = tf.sub(v2, v1);
   	v = tf.div(v, (tf.norm(v, 'euclidean', [-1,])).reshape([12,1])); 
   	v = await v.array();

	const newV1Id = [0, 1, 2, 3, 4, 6, 7, 8, 9, 10];
	const newV2Id = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11];
	const newV1 = cv2Vec(v, newV1Id);
	const newV2 = cv2Vec(v, newV2Id);

	// https://en.wikipedia.org/wiki/Einstein_notation
	const radians = tf.acos(tf.einsum("nt, nt->n", newV1, newV2));
	const degree = radian2degree(radians);
	return degree;
};

/**
 *
 * @param {number[][]} landmark
 * @returns {Promise<number[]>}
 */
export const detect = async (landmark) => {
	if (har.model === undefined) return;
	const seqLength = 15;
	const joint = getJoint(landmark);
	const angle = await getPointAngle(landmark);
	const angleList = await angle.data();
	har.countExercise(angleList);
	const reshape_angle = angle.reshape([1, -1]);
	const _scaled_angle = scaler(reshape_angle);
	const scaled_angle = _scaled_angle.reshape([-1, 1]);
	const seq = await tf.concat([joint.flatten(), scaled_angle.flatten()]).data();
	if (har.seq.push(seq) <= seqLength) return;
	har.seq.shift();
	const input = tf.expandDims(tf.tensor(har.seq), 0);
	const result = await har.predict(input);
	har.result = result[1];
	return result;
};
