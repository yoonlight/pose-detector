import * as tf from "@tensorflow/tfjs";

class HAR {
	/** @type tf.LayersModel */
	model;
	seq = [];
	async loadModel() {
		let weightPath = "";
		if (process.env.NODE_ENV === "production") {
			weightPath = "https://yoonlight.github.io/pose-detector/";
		}
		this.model = await tf.loadLayersModel("model.json", {
			weightPathPrefix: weightPath,
		});
	}

	/**
	 *
	 * @param {tf.Tensor} input
	 * @returns {Promise<number[]>}
	 */
	async predict(input) {
		return await this.model.predict(input).squeeze().array();
	}
}

export const har = new HAR();
