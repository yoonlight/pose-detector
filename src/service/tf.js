import * as tf from "@tensorflow/tfjs";
import { har } from "./model";

/**
 * @param {number[][]} landmark
 */
const getJoint = (landmark) => tf.tensor(landmark);

/**
 *
 * @param {number[][]} landmark
 */
const getPointAngle = async (landmark) => {
	const v1Id = [4, 2, 2, 8, 10, 12, 3, 1, 1, 7, 9, 11];
	const v2Id = [6, 4, 8, 10, 12, 16, 5, 3, 7, 9, 11, 15];
	const v1Arr = v1Id.map((num) => landmark[num]);
	const v2Arr = v2Id.map((num) => landmark[num]);
	const v1 = tf.tensor(v1Arr);
	const v2 = tf.tensor(v2Arr);

	let v = tf.sub(v2, v1);
	v = tf.div(v, tf.norm(v));
	v = await v.array();

	const newV1Id = [0, 1, 2, 3, 4, 6, 7, 8, 9, 10];
	const newV2Id = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11];
	const newV1Arr = newV1Id.map((num) => v[num]);
	const newV2Arr = newV2Id.map((num) => v[num]);
	const newV1 = tf.tensor(newV1Arr);
	const newV2 = tf.tensor(newV2Arr);

	// https://en.wikipedia.org/wiki/Einstein_notation
	const radians = tf.acos(tf.einsum("nt, nt->n", newV1, newV2));
	const pi = tf.scalar(180 / Math.PI);
	const degree = tf.mul(radians, pi);
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
	const seq = await tf.concat([joint.flatten(), angle]).data();
	if (har.seq.push(seq) <= seqLength) return;
	har.seq.shift();
	const input = tf.expandDims(tf.tensor(har.seq), 0);
	const result = await har.predict(input);
	return result;
};
