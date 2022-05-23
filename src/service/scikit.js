import * as tf from "@tensorflow/tfjs";
import * as sk from "scikitjs";
import { Normalizer } from "scikitjs";

sk.setBackend(tf);

/**
 *
 * @param {Tensor2D} data
 * @returns
 */
export const scaler = (data) => {
	const scaler = new Normalizer();
	const expected = scaler.fitTransform(data);
	return expected;
};
