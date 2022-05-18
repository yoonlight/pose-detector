import * as tf from "@tensorflow/tfjs";

class HAR {
	/** @type tf.LayersModel */
	model;
	seq = [];
	/**
	 *
	 * @param {string} pose
	 */
	async loadModel(pose) {
		const modelUrl =
			`https://raw.githubusercontent.com/yoonlight/pose-detector/main/models/${pose}/model.json`;
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
