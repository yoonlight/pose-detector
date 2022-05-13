import * as tf from "@tensorflow/tfjs";

class HAR {
	/** @type tf.LayersModel */
	model;
	seq = [];
	async loadModel() {
		const modelUrl = "https://raw.githubusercontent.com/yoonlight/pose-detector/main/public/model.json"
		this.model = await tf.loadLayersModel(modelUrl);
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
